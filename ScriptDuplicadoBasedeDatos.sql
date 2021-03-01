USE [master]
GO
/****** Object:  Database [Viajar360]    Script Date: 1/3/2021 8:52:39 p. m. ******/
CREATE DATABASE [Viajar360]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Viajar360', FILENAME = N'C:\Users\matia\Viajar360.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Viajar360_log', FILENAME = N'C:\Users\matia\Viajar360_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Viajar360] SET COMPATIBILITY_LEVEL = 110
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
ALTER DATABASE [Viajar360] SET AUTO_CLOSE OFF 
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
ALTER DATABASE [Viajar360] SET  DISABLE_BROKER 
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
USE [Viajar360]
GO
/****** Object:  Table [dbo].[Atracciones]    Script Date: 1/3/2021 8:52:39 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Atracciones](
	[id_atraccion] [int] NOT NULL,
	[nombre] [varchar](50) NULL,
	[detalles] [varchar](255) NULL,
	[id_ciudad] [int] NOT NULL,
	[ubicacion] [varchar](25) NULL,
 CONSTRAINT [PK_Atracciones] PRIMARY KEY CLUSTERED 
(
	[id_atraccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Chat]    Script Date: 1/3/2021 8:52:39 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Chat](
	[id_categoria] [int] NOT NULL,
	[categoria] [varchar](50) NULL,
 CONSTRAINT [PK_Chat] PRIMARY KEY CLUSTERED 
(
	[id_categoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ciudades]    Script Date: 1/3/2021 8:52:39 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ciudades](
	[id_ciudad] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](25) NULL,
 CONSTRAINT [PK_Ciudades] PRIMARY KEY CLUSTERED 
(
	[id_ciudad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clima]    Script Date: 1/3/2021 8:52:40 p. m. ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comentarios]    Script Date: 1/3/2021 8:52:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comentarios](
	[id_comentario] [int] NOT NULL,
	[id_tema] [int] NOT NULL,
	[fecha_hora] [timestamp] NOT NULL,
	[mensaje] [varchar](600) NOT NULL,
	[id_usuario] [int] NOT NULL,
	[reportes] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Preguntas]    Script Date: 1/3/2021 8:52:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Preguntas](
	[id_pregunta] [int] NOT NULL,
	[pregunta] [varchar](max) NULL,
	[respuesta] [varchar](max) NULL,
	[id_categoria] [int] NULL,
 CONSTRAINT [PK_Preguntas] PRIMARY KEY CLUSTERED 
(
	[id_pregunta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Temas]    Script Date: 1/3/2021 8:52:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Temas](
	[id_tema] [int] NOT NULL,
	[titulo] [varchar](255) NULL,
	[estado] [int] NULL,
 CONSTRAINT [PK_Temas] PRIMARY KEY CLUSTERED 
(
	[id_tema] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 1/3/2021 8:52:40 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[id_usuario] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](20) NOT NULL,
	[password] [varchar](20) NOT NULL,
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
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Preguntas]  WITH CHECK ADD  CONSTRAINT [FK_Preguntas_Preguntas] FOREIGN KEY([id_pregunta])
REFERENCES [dbo].[Preguntas] ([id_pregunta])
GO
ALTER TABLE [dbo].[Preguntas] CHECK CONSTRAINT [FK_Preguntas_Preguntas]
GO
USE [master]
GO
ALTER DATABASE [Viajar360] SET  READ_WRITE 
GO
