using System;
using Microsoft.AspNetCore.Mvc;
using Code_Challenge_Question_1.Models;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Code_Challenge_Question_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EncodeController : ControllerBase
    {
		private readonly ILogger<EncodeController> _logger;

		private readonly IConfiguration _config;
		public EncodeController(ILogger<EncodeController> logger, IConfiguration config)
		{
			_logger = logger;
			_config = config;
		}
				
		[HttpPost]
		public async Task<JsonResult> Execute(EncodeRequest request)
		{
			var encodedMessage = new ResponseMessage();
			try
			{
				for (int i = 0; i < request.Message.Length; i++)
				{
					char indChar = request.Message[i];
					if (char.IsLetter(indChar))
					{
						encodedMessage.EncodedMessage += ShiftLetter(indChar, request.Shift);
					}
					else
					{
						encodedMessage.EncodedMessage += indChar;
					}
				}
				var path = Path.Combine((string) _config.GetValue(typeof(string),"FilePath"), ("encrypted_" + DateTime.Now.ToString("yyyyMMdd_HHmmss") + ".txt"));
				if (!System.IO.File.Exists(path))
				{
					await System.IO.File.WriteAllTextAsync(path, encodedMessage.EncodedMessage);
				}
				else
				{					
					throw new Exception("File exists.");
				}
				return new JsonResult(encodedMessage) { StatusCode = 200 };
			}
			catch (Exception e)
			{
				_logger.LogError("Error: " + e.Message);
				var blankMessage = new ResponseMessage();
				return new JsonResult(blankMessage) { StatusCode = 500 };
			}
		}
		private char ShiftLetter(char value, int shift)
		{
			char offset = char.IsUpper(value) ? 'A' : 'a';
			return (char)((((value + shift) - offset) % 26) + offset);
		}				
	}
}