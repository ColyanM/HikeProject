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
}