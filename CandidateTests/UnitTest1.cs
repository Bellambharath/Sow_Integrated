using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework.Internal;

namespace CandidateTests
{
    public class Tests
    {
        public class UstPocTest
        {
            [SetUp]
            public Mock<IConfiguration> SetupConfigurationMock()
            {
                var configurationMock = new Mock<IConfiguration>();
                configurationMock.Setup(x => x.GetSection("ConnectionStrings").GetSection("DbConnection").Value).Returns(
                "Data Source=B100LHYD\\SQLEXPRESS;Initial Catalog=master;Persist Security Info=True;User ID=sa;Password=Prathyusha@123");
                return configurationMock;
            }
            [TestFixture]
            public class UstPocControllerTests
            {
                [Test]
                public void Get_Should_Return_ListOfUstPocs()
                {
                    //Arrange
                    Tests test = new Tests();
                    var configMock = test.SetupConfigurationMock();
                    var target = new UstPocController(configMock.Object);
                    //Act
                    var res = target.Get();
                    //Assert
                    Assert.IsNotNull(res);
                    Assert.IsInstanceOf<List<USTPOCModel>>(res);
                }
                [Test]
                public void Get_ReturnEmptyListOfUstPoc()
                {
                    //Arrange
                    Tests tests = new Tests();
                    var configMock = test.SetupConfigurationMock();
                    var target = new UstPocController(configMock.Object);
                    var id = 0;
                    //Act
                    var result = target.Get(id);
                    //Arrange
                    Assert.IsEmpty(result);
                    Assert.IsInstanceOf<List<USTPOCModel>>(result);
                }
                [Test]
                public void Get_ReturnsListOfUstPoc()
                {
                    //Arrange
                    Tests test = new Tests();
                    var configMock = test.SetupConfigurationMock();
                    var target = new UstPocController(configMock.Object);
                    var id = 1;
                    //Act
                    var res = target.Get(id);
                    //Assert
                    Assert.IsNotEmpty(res);
                    Assert.IsInstanceOf<List<USTPOCModel>>(res);
                }
                [Test]
                public void Post_ValidUstPOCModel_ReturnsSerializeMessage()
                {
                    //Arrange
                    Tests test = new Tests();
                    var configMock = test.SetupConfigurationMock();
                    var target = new UstPocController(configMock.Object);
                    var ustPocModel = new USTPOCModel { USTPOCId = 30, USTPOCName = "Mag", Type = "" };
                    //Act
                    var result = target.Post(ustPocModel);
                    //Assert
                    Assert.IsNotNull(result);
                    Assert.IsInstanceOf<string>(result);



                }



                [Test]
                public void Put_ValidUstPOCModel_ReturnsSerializeMessage()
                {
                    //Arrange
                    Tests test = new Tests();
                    var configMock = test.SetupConfigurationMock();
                    var target = new UstPocController(configMock.Object);
                    var ustPocModel = new USTPOCModel { USTPOCId = 0, USTPOCName = "Mag11", Type = "" };
                    var id = 123;
                    //Act
                    var result = target.Put(id, ustPocModel);
                    //Assert
                    Assert.IsNotNull(result);
                    Assert.IsInstanceOf<string>(result);
                }
                [Test]
                public void Delete_ValidUstPocModel_ReturnsSerializeMessage()
                {
                    //Arrange
                    Tests test = new Tests();
                    var configMock = test.SetupConfigurationMock();
                    var target = new UstPocController(configMock.Object);
                    var id = 1;
                    //Act
                    var res = target.Delete(id);
                    //Assert
                    Assert.IsNotNull(res);
                    Assert.IsInstanceOf<string>(res);
                }
            }
        }
    }
}