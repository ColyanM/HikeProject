using Microsoft.EntityFrameworkCore;
using Xunit;
using System.Linq;

public class HikesControllerTests
{
    [Fact]
    //returns all hikes test
    public void GetHikes_Returns_All_Hikes()
    {
        var options = new DbContextOptionsBuilder<ApplicationDb>()
            .UseInMemoryDatabase("GetHikes_Returns_All_Hikes")
            .Options;

        using var db = new ApplicationDb(options);

        db.Hikes.Add(new Hike
        {
            Name = "Test Hike",
            Region = "North",
            Distance = 10m,
            ElevationGain = 100
        });
        db.SaveChanges();

        var controller = new HikesController(db);
        var result = controller.GetHikes();

        Assert.Single(result.Value);
        Assert.Equal("Test Hike", result.Value.First().Name);
    }

    [Fact]
    //creating new hike test
    public void CreateHike_Adds_Hike_To_Database()
    {
        var options = new DbContextOptionsBuilder<ApplicationDb>()
            .UseInMemoryDatabase("CreateHike_Adds_Hike_To_Database")
            .Options;

        using var db = new ApplicationDb(options);
        var controller = new HikesController(db);

        var newHike = new Hike
        {
            Name = "New Hike",
            Region = "South",
            Distance = 5m,
            ElevationGain = 200
        };

        controller.CreateHike(newHike);

        Assert.Equal(1, db.Hikes.Count());
        Assert.Equal("New Hike", db.Hikes.First().Name);
    }

    //login testing used to work but fails because of BCrypt now
    [Fact]
    public void Login_Returns_User_When_Credentials_Match()
    {
        var options = new DbContextOptionsBuilder<ApplicationDb>()
            .UseInMemoryDatabase("Login_Returns_User_When_Credentials_Match")
            .Options;

        using var db = new ApplicationDb(options);

        db.Users.Add(new User
        {
            Name = "Test User",
            Email = "a@a.com",
            Password = "123"
        });
        db.SaveChanges();

        var controller = new HikesController(db);
        var result = controller.Login(new LoginRequest
        {
            Email = "a@a.com",
            Password = "123"
        });
        Assert.NotNull(result.Value);
        Assert.Equal("a@a.com", result.Value.Email);
        Assert.True(result.Value.Id > 0);
    }

    

}
