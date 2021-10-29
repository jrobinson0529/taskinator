USE [master]
GO
/****** Object:  Database [Taskinator]    Script Date: 10/26/2021 8:14:34 PM ******/
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
/****** Object:  Table [dbo].[Orders]    Script Date: 10/26/2021 8:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[id] [uniqueidentifier] NOT NULL,
	[customerId] [uniqueidentifier] NOT NULL,
	[paymentId] [uniqueidentifier] NULL,
	[orderTotal] [money] NOT NULL,
	[orderDate] [datetime] NULL,
 CONSTRAINT [PK__Orders__3213E83FA1E2162C] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 10/26/2021 8:14:34 PM ******/
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
/****** Object:  Table [dbo].[Robot_Categories]    Script Date: 10/26/2021 8:14:34 PM ******/
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
/****** Object:  Table [dbo].[Robots]    Script Date: 10/26/2021 8:14:34 PM ******/
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
	[available] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Robots_Orders]    Script Date: 10/26/2021 8:14:34 PM ******/
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
/****** Object:  Table [dbo].[Users]    Script Date: 10/26/2021 8:14:34 PM ******/
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
	[googleId] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Orders] ([id], [customerId], [paymentId], [orderTotal], [orderDate]) VALUES (N'633294b2-c05e-4323-8104-c5af08711b0e', N'94f428ec-2d55-443e-9c64-03d0468d0a52', N'cf245dfd-20e2-4745-90a0-e7a6fa1e1655', 260.0000, NULL)
INSERT [dbo].[Orders] ([id], [customerId], [paymentId], [orderTotal], [orderDate]) VALUES (N'bcf99b9c-2eb6-4ebf-b1d1-c6ef95f36048', N'1d8ccac9-2dcd-43a3-90e1-6e91b526cf1d', N'cf245dfd-20e2-4745-90a0-e7a6fa1e1655', 150.0000, NULL)
INSERT [dbo].[Orders] ([id], [customerId], [paymentId], [orderTotal], [orderDate]) VALUES (N'75ac8cac-ef96-495b-b8bb-d398426a9f44', N'1d8ccac9-2dcd-43a3-90e1-6e91b526cf1d', N'cf245dfd-20e2-4745-90a0-e7a6fa1e1655', 20.0000, CAST(N'2020-03-03T00:00:00.000' AS DateTime))
INSERT [dbo].[Orders] ([id], [customerId], [paymentId], [orderTotal], [orderDate]) VALUES (N'2ab926cb-bce6-4993-972b-e2a69613c2c7', N'94f428ec-2d55-443e-9c64-03d0468d0a52', N'cf245dfd-20e2-4745-90a0-e7a6fa1e1655', 369586.0000, CAST(N'2021-10-18T00:00:00.000' AS DateTime))
INSERT [dbo].[Payments] ([id], [accountNumber], [paymentType]) VALUES (N'eeaa9dae-3229-4190-ad73-70b25023aa73', N'4ade38ae-50af-4acc-8616-007b8bcbdfae', N'Visa')
INSERT [dbo].[Payments] ([id], [accountNumber], [paymentType]) VALUES (N'cf245dfd-20e2-4745-90a0-e7a6fa1e1655', N'1d8ccac9-2dcd-43a3-90e1-6e91b526cf1d', N'1')
INSERT [dbo].[Robot_Categories] ([id], [title], [description]) VALUES (N'7cb84331-6135-40ee-9806-60cebd755f1f', N'Chores', N'These robots have a diverse array of household chores they are capable of doing autonomously and efficiently')
INSERT [dbo].[Robot_Categories] ([id], [title], [description]) VALUES (N'f81a7280-8b3e-4865-8568-9ada95b19b17', N'Lawn Care', N'Robots that are great at taking care of the lawn')
INSERT [dbo].[Robot_Categories] ([id], [title], [description]) VALUES (N'7aaf5030-971c-4d5c-abcf-d95ebd418ee3', N'Friendly', N'Robots that can hold conversations with you, nanny the kids, or just be a friend')
INSERT [dbo].[Robot_Categories] ([id], [title], [description]) VALUES (N'5b8edfe1-6001-4080-8464-f04d893d1fb0', N'Murder', N'Robots that are capable of taking care of business and waste management')
INSERT [dbo].[Robots] ([id], [imageUrl], [categoryId], [title], [price], [description], [available]) VALUES (N'4fb370e3-f6f3-4a59-a65d-fc019426afb2', N'google.com', N'f81a7280-8b3e-4865-8568-9ada95b19b17', N'Lawnbot3000', 1.0000, N'cuts grass and fingers', 1)
INSERT [dbo].[Robots_Orders] ([id], [dayQuantity], [robotId], [orderId]) VALUES (N'b05e0894-8ea7-4254-81ad-84629e90d546', 2, N'4fb370e3-f6f3-4a59-a65d-fc019426afb2', N'75ac8cac-ef96-495b-b8bb-d398426a9f44')
INSERT [dbo].[Users] ([id], [imageUrl], [dateCreated], [username], [firstName], [lastName], [email], [billingAddress], [isAdmin], [googleId]) VALUES (N'4ade38ae-50af-4acc-8616-007b8bcbdfae', N'gogole.com', CAST(N'2021-10-13T10:35:54.120' AS DateTime), N'jboi2055', N'john', N'struggenfalrge', N'jstruggin@gmail.com', N'555 lazy lane', 0, NULL)
INSERT [dbo].[Users] ([id], [imageUrl], [dateCreated], [username], [firstName], [lastName], [email], [billingAddress], [isAdmin], [googleId]) VALUES (N'94f428ec-2d55-443e-9c64-03d0468d0a52', N'chie-chan.com', CAST(N'2021-10-18T19:57:44.617' AS DateTime), N'Chie Sama', N'Chie', N'Sama', N'chiechie@chie.com', N'kyoto', 1, NULL)
INSERT [dbo].[Users] ([id], [imageUrl], [dateCreated], [username], [firstName], [lastName], [email], [billingAddress], [isAdmin], [googleId]) VALUES (N'1d8ccac9-2dcd-43a3-90e1-6e91b526cf1d', NULL, CAST(N'2021-10-07T19:43:07.687' AS DateTime), N'jroboianopa', N'jesse', N'robinson', N'jesse0529robinson@gmail.com', N'555 boi ave', 1, NULL)
INSERT [dbo].[Users] ([id], [imageUrl], [dateCreated], [username], [firstName], [lastName], [email], [billingAddress], [isAdmin], [googleId]) VALUES (N'778710ec-c3a6-450c-9bd3-bf60de9344c8', NULL, CAST(N'2021-10-13T11:12:59.850' AS DateTime), NULL, NULL, NULL, N'string', NULL, 0, NULL)
INSERT [dbo].[Users] ([id], [imageUrl], [dateCreated], [username], [firstName], [lastName], [email], [billingAddress], [isAdmin], [googleId]) VALUES (N'21e06fea-92ee-4fb4-9ac9-c3b6bb369ef3', N'https://lh3.googleusercontent.com/a-/AOh14GhIeBirgjav8P91oatq9Dw2azGukS4dMJ2xs2Kz6w=s96-c', CAST(N'2021-10-26T20:10:14.727' AS DateTime), N'jesse0529robinson', N'Jesse', N'Robinson', N'jesse0529robinson@gmail.com', N' ', 0, N'ukCtLo5KZRQQ1vCpQc0dEx7qmr53')
ALTER TABLE [dbo].[Orders] ADD  CONSTRAINT [DF__Orders__id__2E1BDC42]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Payments] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Robot_Categories] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Robots] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Robots] ADD  CONSTRAINT [DF_Robots_available]  DEFAULT ((1)) FOR [available]
GO
ALTER TABLE [dbo].[Robots_Orders] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Robots_Orders] ADD  DEFAULT ((1)) FOR [dayQuantity]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_dateCreated]  DEFAULT (getdate()) FOR [dateCreated]
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
