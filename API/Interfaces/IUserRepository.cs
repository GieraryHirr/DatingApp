using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entity;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        //Update profile
        void Update(AppUser user);
        //Saving our changes
        Task<bool> SaveAllAsync();
        //Download users from database and set them as IEnumerable
        Task<IEnumerable<AppUser>> GetUsersAsync();
        //Getting user by ID
        Task<AppUser> GetUserByIdAsync(int id);
        //Getting user by username
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<IEnumerable<MemberDto>> GetMembersAsync();
        Task<MemberDto> GetMemberAsync(string username);
    }
}