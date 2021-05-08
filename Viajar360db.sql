USE [master]
GO
/****** Object:  Database [Viajar360]    Script Date: 08/05/2021 20:25:06 ******/
CREATE DATABASE [Viajar360]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Viajar360', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Viajar360.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Viajar360_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Viajar360_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Viajar360] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Viajar360].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Viajar360] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Viajar360] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Viajar360] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Viajar360] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Viajar360] SET ARITHABORT OFF 
GO
ALTER DATABASE [Viajar360] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [Viajar360] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Viajar360] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Viajar360] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Viajar360] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Viajar360] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Viajar360] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Viajar360] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Viajar360] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Viajar360] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Viajar360] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Viajar360] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Viajar360] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Viajar360] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Viajar360] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Viajar360] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Viajar360] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Viajar360] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Viajar360] SET  MULTI_USER 
GO
ALTER DATABASE [Viajar360] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Viajar360] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Viajar360] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Viajar360] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Viajar360] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Viajar360] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Viajar360] SET QUERY_STORE = OFF
GO
USE [Viajar360]
GO
/****** Object:  Table [dbo].[Atracciones]    Script Date: 08/05/2021 20:25:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Atracciones](
	[id_atraccion] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[detalles] [varchar](255) NOT NULL,
	[id_ciudad] [int] NOT NULL,
	[ubicacion] [varchar](25) NOT NULL,
 CONSTRAINT [PK_Atracciones] PRIMARY KEY CLUSTERED 
(
	[id_atraccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Chat]    Script Date: 08/05/2021 20:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Chat](
	[id_chat] [int] IDENTITY(1,1) NOT NULL,
	[apellido] [varchar](50) NULL,
	[nombre] [varchar](50) NULL,
	[mensaje] [varchar](max) NULL,
	[fecha_hora] [datetime] NULL,
	[mail] [varchar](50) NOT NULL,
	[respondido] [bit] NULL,
 CONSTRAINT [PK_Chat] PRIMARY KEY CLUSTERED 
(
	[id_chat] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ciudades]    Script Date: 08/05/2021 20:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ciudades](
	[id_ciudad] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](25) NOT NULL,
 CONSTRAINT [PK_Ciudades] PRIMARY KEY CLUSTERED 
(
	[id_ciudad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clima]    Script Date: 08/05/2021 20:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clima](
	[id_clima] [int] NOT NULL,
	[id_ciudad] [int] NOT NULL,
	[fecha] [date] NULL,
	[temperatura] [decimal](5, 2) NULL,
	[estado_climatico] [varchar](30) NULL,
 CONSTRAINT [PK_Clima] PRIMARY KEY CLUSTERED 
(
	[id_clima] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comentarios]    Script Date: 08/05/2021 20:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comentarios](
	[id_comentario] [int] IDENTITY(1,1) NOT NULL,
	[id_tema] [int] NOT NULL,
	[fecha_hora] [timestamp] NOT NULL,
	[mensaje] [varchar](600) NOT NULL,
	[id_usuario] [int] NOT NULL,
	[reportes] [int] NOT NULL,
 CONSTRAINT [PK_Comentarios] PRIMARY KEY CLUSTERED 
(
	[id_comentario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Temas]    Script Date: 08/05/2021 20:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Temas](
	[id_tema] [int] IDENTITY(1,1) NOT NULL,
	[titulo] [varchar](255) NOT NULL,
	[estado] [int] NOT NULL,
 CONSTRAINT [PK_Temas] PRIMARY KEY CLUSTERED 
(
	[id_tema] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Token]    Script Date: 08/05/2021 20:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Token](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[usuario] [varchar](50) NOT NULL,
	[token] [varchar](50) NOT NULL,
	[vencimiento] [datetime] NOT NULL,
 CONSTRAINT [PK_token] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 08/05/2021 20:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[id_usuario] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](20) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[apellido] [varchar](20) NULL,
	[nombre] [varchar](20) NULL,
	[mail] [varchar](30) NOT NULL,
	[direccion] [varchar](30) NULL,
	[telefono] [varchar](20) NULL,
	[localidad] [varchar](25) NULL,
	[provincia] [varchar](25) NULL,
	[foto] [varchar](50) NULL,
	[estado] [varchar](1) NOT NULL,
	[fecha_kick] [datetime] NULL,
	[motivo] [varchar](200) NULL,
	[reset_password] [bit] NOT NULL,
	[modificaciones] [varchar](17) NOT NULL,
	[salt] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Chat] ON 
GO
INSERT [dbo].[Chat] ([id_chat], [apellido], [nombre], [mensaje], [fecha_hora], [mail], [respondido]) VALUES (1, N'', N'', N'', CAST(N'2021-05-07T10:35:36.183' AS DateTime), N'veros@gmail.com', NULL)
GO
INSERT [dbo].[Chat] ([id_chat], [apellido], [nombre], [mensaje], [fecha_hora], [mail], [respondido]) VALUES (2, N'vero', N'sdetet', N'sfasfafasfsfasfasfasfsasfasasfasfasfasfasfasf', CAST(N'2021-05-07T11:55:08.227' AS DateTime), N've@gmail.com', NULL)
GO
INSERT [dbo].[Chat] ([id_chat], [apellido], [nombre], [mensaje], [fecha_hora], [mail], [respondido]) VALUES (3, N'sfsdfsd', N'sdfsdfsdfds', N'sdfsdfsdfsd', CAST(N'2021-05-07T11:57:35.013' AS DateTime), N'vers@gmail.com', NULL)
GO
SET IDENTITY_INSERT [dbo].[Chat] OFF
GO
SET IDENTITY_INSERT [dbo].[Token] ON 
GO
INSERT [dbo].[Token] ([id], [usuario], [token], [vencimiento]) VALUES (1, N'biancarojas', N'7123e554-93cc-4d8c-90ee-cbb0ed50d753', CAST(N'2021-06-07T00:00:00.000' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[Token] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 
GO
INSERT [dbo].[Usuario] ([id_usuario], [username], [password], [apellido], [nombre], [mail], [direccion], [telefono], [localidad], [provincia], [foto], [estado], [fecha_kick], [motivo], [reset_password], [modificaciones], [salt]) VALUES (1, N'biancarojas', N'j+pkKrPKnGfP14FY5wFwgXBxF1Db+li3q2bcQh39TLU=', N'', N'', N'veros7821@gmail.com', N'', N'', N'', N'', NULL, N'N', NULL, N'', 0, N'0', N'U5IZHyF5rtjFVYdnEuK5Gw==')
GO
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
USE [master]
GO
ALTER DATABASE [Viajar360] SET  READ_WRITE 
GO
