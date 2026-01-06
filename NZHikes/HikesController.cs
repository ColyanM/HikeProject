using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class HikesController : ControllerBase
{
    private readonly ApplicationDb _db;
    public HikesController(ApplicationDb context)
    {
        _db = context;
    }

    // returns all hikes in the db currently - displayed on home page
    [HttpGet]
    public ActionResult<IEnumerable<Hike>> GetHikes()
    {
        return _db.Hikes.ToList();
    }


    //return a specific hike based on id when a hike is clicked
    [HttpGet("{id}")]
    public ActionResult<Hike> GetHike(int id)
    {
        var hike = _db.Hikes.Find(id);

        return hike;
    }

    //adds a new hike with info from front end form
    [HttpPost]
    public ActionResult<Hike> CreateHike([FromBody] Hike newHike)
    {
        _db.Hikes.Add(newHike);
        _db.SaveChanges();
        return CreatedAtAction(nameof(GetHike), new { id = newHike.Id }, newHike);
    }
    //doesn't have a check for multiple emails or white space if I have time I can review this
    [HttpPost("users/register")]
    public ActionResult<User> Register([FromBody] User user)
    {
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        _db.Users.Add(user);
        _db.SaveChanges();
        return user;
    }


    //Takes the email and password and checks if a user is in the db
    [HttpPost("users/login")]
    public ActionResult<User> Login([FromBody] LoginRequest req)
    {

        if(!_db.Users.Any(u => u.Email == req.Email))
        {
            return Unauthorized("Invalid email or password");
        }


        var existing = _db.Users
            .FirstOrDefault(u => u.Email == req.Email);


        if(!BCrypt.Net.BCrypt.Verify(req.Password, existing.Password))
        {
            return Unauthorized("Invalid email or password");
        }

        return existing;
    }



    //Lists a hike as completed with the additional details and is added to the table
    [HttpPost("completed")]
    public ActionResult<CompletedHike> AddCompletedHike([FromBody] CompletedHike completed)
    {
        _db.CompletedHikes.Add(completed);
        _db.SaveChanges();
        return completed;
    }

    //same logic as displaying all hikes except it is filtered with just the user ID and displays the completed hike info
    [HttpGet("users/{userId}/completed")]
    public ActionResult<IEnumerable<CompletedHike>> GetCompletedForUser(int userId)
    {
        return _db.CompletedHikes.Where(ch => ch.UserId == userId).ToList();
    }

    //same as above but from hikes table to get that info
    [HttpGet("users/{userId}/completed-hikes")]
    public ActionResult<IEnumerable<Hike>> GetCompletedHikesForUser(int userId)
    {
        var hikeIds = _db.CompletedHikes
            .Where(ch => ch.UserId == userId)
            .Select(ch => ch.HikeId)
            .ToList();

        return _db.Hikes.Where(h => hikeIds.Contains(h.Id)).ToList();
    }

    //updates hike info. Currently no page for this 
    [HttpPut("{id}")]
    public IActionResult UpdateHike(int id, [FromBody] Hike updatedHike)
    {
        var existingHike = _db.Hikes.FirstOrDefault(h => h.Id == id);
        if (existingHike == null) return NotFound();

        existingHike.Name = updatedHike.Name;
        existingHike.Region = updatedHike.Region;
        existingHike.Distance = updatedHike.Distance;
        existingHike.ElevationGain = updatedHike.ElevationGain;

        _db.SaveChanges();
        return NoContent();
    }

    //Joins hike and completed hikes to pull all info
    [HttpGet("users/{userId}/completed-details")]
    public IActionResult GetCompletedDetailsForUser(int userId)
    {
        var result =
            from ch in _db.CompletedHikes
            join h in _db.Hikes on ch.HikeId equals h.Id
            where ch.UserId == userId
            select new
            {
                completedId = ch.Id,
                hikeId = h.Id,
                name = h.Name,
                region = h.Region,
                distance = h.Distance,
                elevationGain = h.ElevationGain,
                dateCompleted = ch.DateCompleted,
                minutesTaken = ch.minutesTaken,
                notes = ch.notes
            };

        return Ok(result.ToList());
    }


}

