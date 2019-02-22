using System.IO;
using infrastructure.Config;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;

namespace infrastructure.Services
{
    interface IDirInfo
    {
        string RelativePas { get; }
        string AbsolutePas { get; }
    }

    public class DirInfo : IDirInfo
    {
       public string RelativePas { get; }
       public string AbsolutePas { get; }
        

        public DirInfo( string relativePas, string absolutePas)
        {
            RelativePas = relativePas;
            AbsolutePas = absolutePas;
        }
    }

    public interface IFileStoreService
    {
        DirInfo GetImageDir();
    }
    
    public class FileStoreService: IFileStoreService
    {
        private readonly FileStoreConfig _fileStoreConfig;
        private readonly IHostingEnvironment _env;
        public FileStoreService(IHostingEnvironment env,IOptions<FileStoreConfig> fileStoreConfig)
        {
            _env = env;
            _fileStoreConfig = fileStoreConfig.Value;
        }

        public DirInfo GetImageDir()
        {
            string relativePas = Path.Combine( _fileStoreConfig.RootDir, _fileStoreConfig.ImageDir);;
            string absolutePas = Path.Combine(_env.WebRootPath,relativePas);
            return new DirInfo(relativePas, absolutePas);
        }
    }
}