public class CompletedHike
{
    public int Id { get; set; }
    public required int HikeId { get; set; }
    public required int UserId { get; set; }
    public DateTime DateCompleted { get; set; }
    public int minutesTaken { get; set; }
    public string notes { get; set; }

}


//constructor for hike objects hat a user completed, different from a hike because the date, mins and notes are added. Could research this for a better approach later to inherity the hike properties like java
