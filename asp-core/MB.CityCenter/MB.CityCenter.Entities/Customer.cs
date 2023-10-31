namespace MB.CityCenter.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }

        public List<Order> Orders { get; set; } = new List<Order>();

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
        public int Age
        {
            get
            {
                return DateTime.Now.Year - DateOfBirth.Year;
            }
        }
    }
}
