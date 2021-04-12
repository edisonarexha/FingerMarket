using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LaptopsController: ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;


        public LaptopsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
            select LaptopsID, Brand, Performance, Price,Photo from Laptops order by LaptopsID desc";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FingerMarketAppConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); 

                    myReader.Close();
                    myCon.Close();
                }

            }
            return new JsonResult(table);

        }
        [HttpPost]
        public JsonResult Post(Laptops lp)
        {
            string query = @"INSERT INTO Laptops(Brand,Performance,Price,Photo) values ('" + lp.Brand + @"','" + lp.Performance + @"','" + lp.Price + @"','" + lp.Photo + @"')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FingerMarketAppConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
                return new JsonResult("Added Suscccesfully");
            }
 }
        [HttpPut]
        public JsonResult Put(Laptops lp)
        {
            string query = @"
            update Laptops set 
            Brand = '" + lp.Brand + @"'
            ,Performance = '" + lp.Performance + @"'
            ,Price='" + lp.Price + @"'
            ,Photo='"+lp.Photo+@"'
            where LaptopsID=" + lp.LaptopsID + @" ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FingerMarketAppConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); 

                    myReader.Close();
                    myCon.Close();
                }

                return new JsonResult("Updated Suscccesfully");
            }
}
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM Laptops where LaptopsID=" + id + @" ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FingerMarketAppConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }

                return new JsonResult("Deleted Suscccesfully");
            }
}
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }

        [Route("GetPhoto/{name}")]
        [HttpGet]
        public IActionResult GetPhoto(string name)
        {

            string physicalPath = _env.ContentRootPath + "/Photos/" + name;
            Byte[] b = System.IO.File.ReadAllBytes(@"" + physicalPath);
            return File(b, "image/jpeg");
        }
    }
}
