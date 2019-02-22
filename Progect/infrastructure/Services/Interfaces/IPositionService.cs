using infrastructure.DataAccess.Models;
using infrastructure.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Services.Interfaces
{
    public interface IPositionService: IBaseService<Position>
    {
        Task<IList<Position>> FindAllByCategoryId(Guid categoryId);
    }
}
