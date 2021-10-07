USE [master]
GO
/****** Object:  Database [Taskinator]    Script Date: 10/7/2021 6:24:24 PM ******/
CREATE DATABASE [Taskinator]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Taskinator', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Taskinator.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Taskinator_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Taskinator_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Taskinator] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Taskinator].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Taskinator] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Taskinator] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Taskinator] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Taskinator] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Taskinator] SET ARITHABORT OFF 
GO
ALTER DATABASE [Taskinator] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Taskinator] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Taskinator] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Taskinator] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Taskinator] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Taskinator] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Taskinator] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Taskinator] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Taskinator] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Taskinator] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Taskinator] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Taskinator] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Taskinator] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Taskinator] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Taskinator] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Taskinator] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Taskinator] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Taskinator] SET RECOVERY FULL 
GO
ALTER DATABASE [Taskinator] SET  MULTI_USER 
GO
ALTER DATABASE [Taskinator] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Taskinator] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Taskinator] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Taskinator] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Taskinator] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Taskinator', N'ON'
GO
ALTER DATABASE [Taskinator] SET QUERY_STORE = OFF
GO
USE [Taskinator]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 10/7/2021 6:24:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[id] [uniqueidentifier] NOT NULL,
	[customerId] [uniqueidentifier] NOT NULL,
	[paymentId] [uniqueidentifier] NULL,
	[orderTotal] [money] NOT NULL,
	[orderDate] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 10/7/2021 6:24:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payments](
	[id] [uniqueidentifier] NOT NULL,
	[accountNumber] [uniqueidentifier] NOT NULL,
	[paymentType] [nvarchar](25) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Robot_Categories]    Script Date: 10/7/2021 6:24:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Robot_Categories](
	[id] [uniqueidentifier] NOT NULL,
	[title] [nvarchar](50) NOT NULL,
	[description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Robots]    Script Date: 10/7/2021 6:24:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Robots](
	[id] [uniqueidentifier] NOT NULL,
	[imageUrl] [nvarchar](255) NULL,
	[categoryId] [uniqueidentifier] NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[price] [money] NOT NULL,
	[description] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Robots_Orders]    Script Date: 10/7/2021 6:24:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Robots_Orders](
	[id] [uniqueidentifier] NOT NULL,
	[dayQuantity] [smallint] NULL,
	[robotId] [uniqueidentifier] NOT NULL,
	[orderId] [uniqueidentifier] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 10/7/2021 6:24:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [uniqueidentifier] NOT NULL,
	[imageUrl] [nvarchar](255) NULL,
	[dateCreated] [datetime] NULL,
	[username] [nvarchar](50) NULL,
	[firstName] [nvarchar](25) NULL,
	[lastName] [nvarchar](25) NULL,
	[email] [nvarchar](50) NULL,
	[billingAddress] [nvarchar](255) NULL,
	[isAdmin] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Payments] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Robot_Categories] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Robots] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Robots_Orders] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Robots_Orders] ADD  DEFAULT ((1)) FOR [dayQuantity]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [isAdmin]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Payments_Orders] FOREIGN KEY([paymentId])
REFERENCES [dbo].[Payments] ([id])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Payments_Orders]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Users_Orders] FOREIGN KEY([customerId])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Users_Orders]
GO
ALTER TABLE [dbo].[Payments]  WITH CHECK ADD  CONSTRAINT [FK_Users_Payments] FOREIGN KEY([accountNumber])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Payments] CHECK CONSTRAINT [FK_Users_Payments]
GO
ALTER TABLE [dbo].[Robots]  WITH CHECK ADD  CONSTRAINT [FK_RobotCategories_Robots] FOREIGN KEY([categoryId])
REFERENCES [dbo].[Robot_Categories] ([id])
GO
ALTER TABLE [dbo].[Robots] CHECK CONSTRAINT [FK_RobotCategories_Robots]
GO
ALTER TABLE [dbo].[Robots_Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_RobotsOrders] FOREIGN KEY([orderId])
REFERENCES [dbo].[Orders] ([id])
GO
ALTER TABLE [dbo].[Robots_Orders] CHECK CONSTRAINT [FK_Orders_RobotsOrders]
GO
ALTER TABLE [dbo].[Robots_Orders]  WITH CHECK ADD  CONSTRAINT [FK_Robots_RobotsOrders] FOREIGN KEY([robotId])
REFERENCES [dbo].[Robots] ([id])
GO
ALTER TABLE [dbo].[Robots_Orders] CHECK CONSTRAINT [FK_Robots_RobotsOrders]
GO
USE [master]
GO
ALTER DATABASE [Taskinator] SET  READ_WRITE 
GO
