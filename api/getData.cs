using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace msal_aspnetcoreapi
{
    public static class getData
    {
        [FunctionName("getData")]
        public static async Task<ActionResult<IEnumerable<MyData>>> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("getData HTTP trigger function processed a request.");

            List<MyData> myData = new();
            foreach (var header in req.Headers)
            {
              myData.Add(new MyData { Name = header.Key, Value = header.Value });
            }

            return myData.ToList();
        }
    }

    public class MyData
    {
      public string Name { get; set; }
      public string Value { get; set; }
    }
}
