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
public ActionResult<User> Login([FromBody] User user)
{
    var existing = _db.Users
        .FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password);

    return existing;
}

}

//Next steps 
// Login a user
//Register a user
//Add a completed hike
//Get all hikes for a user
//Get a specific completed hike
//Update hike details for a user ie notes
