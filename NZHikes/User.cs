public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
}


//constructor for user objects, email should be the unique identifier