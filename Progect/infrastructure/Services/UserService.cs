using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using infrastructure.Config;
using infrastructure.DataAccess;
using infrastructure.DataAccess.DTO;
using infrastructure.DataAccess.Models;
using infrastructure.Services.Interfaces;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace infrastructure.Services
{
    public class UserService : BaseService<User>, IUserService
    {
        private readonly IdentityServer _identityServer;

        public UserService(PostgresDbContext context, IOptions<IdentityServer> identityServer)
            : base(context)
        {
            _identityServer = identityServer.Value;
        }

        public async Task<User> FindByEmail(string email)
        {
            User user = Context.Set<User>().SingleOrDefault(m => m.Email == email);
            return user;
        }

        public async Task<User> FindByPassword(string password)
        {
            User user = Context.Set<User>().FirstOrDefault(m => m.PasswordHash == password);
            return user;
        }

        public async Task ChangeLastLoginDate(string email)
        {
            User user = await FindByEmail(email);
            if (user == null)
            {
                throw new ArgumentException($"Undefined user by email = {email}");
            }

            Context.Users.Update(user);
            Context.SaveChanges();
        }

        public override async Task<User> AddAsync(User user, bool commit=false)
        {
            user.CreationDate = DateTime.UtcNow;
            var savedUser =  await base.AddAsync(user);
            Context.SaveChanges();

            return savedUser;
        }

        public async Task<object> GetAuthorize(User user)
        {
            using (var client = new HttpClient())
            {
                HttpRequestMessage requestMessage = new HttpRequestMessage(
                    new HttpMethod("POST"), $"{_identityServer.Url}/connect/token"
                );
                requestMessage.Content = new FormUrlEncodedContent(new Dictionary<string, string>()
                {
                    {"username", user.Email},
                    {"password", user.PasswordHash},
                    {"client_id", _identityServer.ApiClientName},
                    {"client_secret", _identityServer.ApiSecret},
                    {"grant_type", "password"},
                    
                });
                HttpResponseMessage response = await client.SendAsync(requestMessage);

                string apiResponse = await response.Content.ReadAsStringAsync();
                try
                {
                    if (apiResponse != "")
                    {
                        return JsonConvert.DeserializeObject<TokenAccess>(apiResponse);
                    }

                    throw new Exception();
                }
                catch (Exception ex)
                {
                    throw new Exception(
                        $"An error ocurred while calling the API. It responded with the following message: " +
                        $"{response.StatusCode} {response.ReasonPhrase}"
                    );
                }
            }
        }
    }
}