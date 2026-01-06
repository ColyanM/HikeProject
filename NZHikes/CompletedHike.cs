public class CompletedHike
{
    public int Id { get; set; }
    public required int HikeId { get; set; }
    public required int UserId { get; set; }
    public DateTime DateCompleted { get; set; }
    public int minutesTaken { get; set; }
    public string notes { get; set; }

}


//constructor for hike objects hat a user completed