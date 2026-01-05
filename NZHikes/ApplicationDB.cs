using Microsoft.EntityFrameworkCore;

public class ApplicationDb : DbContext
{
    public ApplicationDb(DbContextOptions<ApplicationDb> options)
        : base(options)
    {
    }

//using 3 tables for this project. A master user list, master hike list and each user will have a list atached with hikes they completed
    public DbSet<User> Users { get; set; }

    public DbSet<Hike> Hikes { get; set; } = null!;
    public DbSet<CompletedHike> CompletedHikes { get; set; } = null!;

}
