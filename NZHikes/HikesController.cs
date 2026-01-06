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

    // returns all hikes in the db currently
    [HttpGet]
    public ActionResult<IEnumerable<Hike>> GetHikes()
    {
        return _db.Hikes.ToList();
    }


    //return a specific hike based on id
    [HttpGet("{id}")]
    public ActionResult<Hike> GetHike(int id)
    {
        var hike = _db.Hikes.Find(id);

        return hike;
    }

    //adds a new hike
    [HttpPost]
    public ActionResult<Hike> CreateHike([FromBody] Hike newHike)
    {
        _db.Hikes.Add(newHike);
        _db.SaveChanges();
        return CreatedAtAction(nameof(GetHike), new { id = newHike.Id }, newHike);
    }
    //doesn't have a check for multiple emails or white space
    [HttpPost("users/register")]
    public ActionResult<User> Register([FromBody] User user)
    {
        _db.Users.Add(user);
        _db.SaveChanges();
        return user;
    }

    [HttpPost("users/login")]
    public ActionResult<User> Login([FromBody] LoginRequest req)
    {
        var existing = _db.Users
            .FirstOrDefault(u => u.Email == req.Email && u.Password == req.Password);

        return existing;
    }




    [HttpPost("completed")]
    public ActionResult<CompletedHike> AddCompletedHike([FromBody] CompletedHike completed)
    {
        _db.CompletedHikes.Add(completed);
        _db.SaveChanges();
        return completed;
    }

    [HttpGet("users/{userId}/completed")]
    public ActionResult<IEnumerable<CompletedHike>> GetCompletedForUser(int userId)
    {
        return _db.CompletedHikes.Where(ch => ch.UserId == userId).ToList();
    }

    [HttpGet("users/{userId}/completed-hikes")]
    public ActionResult<IEnumerable<Hike>> GetCompletedHikesForUser(int userId)
    {
        var hikeIds = _db.CompletedHikes
            .Where(ch => ch.UserId == userId)
            .Select(ch => ch.HikeId)
            .ToList();

        return _db.Hikes.Where(h => hikeIds.Contains(h.Id)).ToList();
    }

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

