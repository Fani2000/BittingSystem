using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Services
{
    public class AuctionServiceHttpClient
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configs;

        public AuctionServiceHttpClient(HttpClient httpClient, IConfiguration configs)
        {
            _httpClient = httpClient;
            _configs = configs;
        }

        public async Task<List<Item>> GetItemsForSearchDb()
        {
            var lastUpdated = await DB.Find<Item, string>()
                .Sort(x => x.Descending(x => x.UpdatedAt))
                .Project(x => x.UpdatedAt.ToString())
                .ExecuteFirstAsync(); // Auction that has been last updated

            Console.WriteLine("DATE: " + lastUpdated + " URL: " + _configs["AuctionServiceUrl"]);

            return await _httpClient.GetFromJsonAsync<List<Item>>(_configs["AuctionServiceUrl"] + "/api/auctions?date=" + lastUpdated);

        }

    }
}
