namespace MB.CityCenter.Dtos.Pagers
{
    internal class PagedResult<T>
    {
        public int Count { get; set; }
        public List<T> Items { get; set; }
    }
}
