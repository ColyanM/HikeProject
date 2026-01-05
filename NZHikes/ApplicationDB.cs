using Microsoft.EntityFrameworkCore;

public class ApplicationDb : DbContext
{
    public ApplicationDb(DbContextOptions<ApplicationDb> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }

    public DbSet<Hike> Hikes { get; set; } = null!;
    public DbSet<CompletedHike> CompletedHikes { get; set; } = null!;

}
