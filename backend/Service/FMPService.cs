using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Stock;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Newtonsoft.Json;

namespace backend.Service
{
    public class FMPService : IFMPService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<Stock> GetStockBySymbolAsync(string symbol)
        {
            try
            {
                var apiKey = _config["FMPKey"];
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/profile?symbol={symbol}&apikey={apiKey}");
                if(result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
                    var stock = tasks[0];
                    if(stock != null)
                    {
                        return stock.ToStockFromFMP();
                    }
                    return null;
                }
                else
                {
                   return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in GetStockBySymbolAsync: {ex.Message}");
                return null;
            }
        }
    }
}