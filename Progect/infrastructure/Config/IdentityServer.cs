namespace infrastructure.Config
{
    public class IdentityServer
    {
        public string Url { get; set; }
        public string ApiName { get; set; }
        public string ApiClientName { get; set; }
        public string ApiSecret { get; set; }
        public string IssuerUri { get; set; }
    }
}