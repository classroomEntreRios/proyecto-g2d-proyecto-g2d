USE [master]
GO
/****** Object:  Database [Viajar360]    Script Date: 10/03/2021 22:17:47 ******/
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
ALTER DATABASE [Viajar360] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Viajar360] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Viajar360] SET QUERY_STORE = OFF
GO
USE [Viajar360]
GO
/****** Object:  Table [dbo].[Atracciones]    Script Date: 10/03/2021 22:17:47 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Chat]    Script Date: 10/03/2021 22:17:47 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ciudades]    Script Date: 10/03/2021 22:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ciudades](
	[id_ciudad] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](25) NULL,
	[detalle] [varchar](255) NULL,
 CONSTRAINT [PK_Ciudades] PRIMARY KEY CLUSTERED 
(
	[id_ciudad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clima]    Script Date: 10/03/2021 22:17:47 ******/
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
/****** Object:  Table [dbo].[Comentarios]    Script Date: 10/03/2021 22:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comentarios](
	[id_comentario] [int] NOT NULL,
	[id_tema] [int] NOT NULL,
	[fecha_hora] [timestamp] NULL,
	[mensaje] [varchar](max) NULL,
	[id_usuario] [int] NOT NULL,
	[foto] [varchar](150) NULL,
 CONSTRAINT [PK_Comentarios] PRIMARY KEY CLUSTERED 
(
	[id_comentario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Fotos_atracciones]    Script Date: 10/03/2021 22:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Fotos_atracciones](
	[id_foto] [int] IDENTITY(1,1) NOT NULL,
	[ruta] [varchar](150) NULL,
	[id_atraccion] [int] NULL,
 CONSTRAINT [PK_Fotos_atracciones] PRIMARY KEY CLUSTERED 
(
	[id_foto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Fotos_ciudades]    Script Date: 10/03/2021 22:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Fotos_ciudades](
	[id_foto] [int] IDENTITY(1,1) NOT NULL,
	[ruta] [varchar](150) NULL,
	[id_ciudad] [int] NULL,
 CONSTRAINT [PK_Fotos_ciudades] PRIMARY KEY CLUSTERED 
(
	[id_foto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Preguntas]    Script Date: 10/03/2021 22:17:47 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Temas]    Script Date: 10/03/2021 22:17:47 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Union]    Script Date: 10/03/2021 22:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Union](
	[id_union] [int] IDENTITY(1,1) NOT NULL,
	[id_usuario] [int] NOT NULL,
	[id_atraccion] [int] NOT NULL,
 CONSTRAINT [PK_Union] PRIMARY KEY CLUSTERED 
(
	[id_union] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarioss]    Script Date: 10/03/2021 22:17:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarioss](
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
	[fecha_alta] [datetime] NULL,
	[fecha_baja] [datetime] NULL,
 CONSTRAINT [PK_Usuarioss] PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Usuarioss] ON 
GO
INSERT [dbo].[Usuarioss] ([id_usuario], [username], [password], [apellido], [nombre], [mail], [direccion], [telefono], [localidad], [provincia], [fecha_alta], [fecha_baja]) VALUES (2, N'veros', N'sdfsdfsdf', N'Steven', N'Verónica', N'sdfsdf', N'sdfsdf', N'sfsfs', N'sfsfs', N'sfsfs', NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Usuarioss] OFF
GO
ALTER TABLE [dbo].[Atracciones]  WITH CHECK ADD  CONSTRAINT [FK_Atracciones_Ciudades1] FOREIGN KEY([id_ciudad])
REFERENCES [dbo].[Ciudades] ([id_ciudad])
GO
ALTER TABLE [dbo].[Atracciones] CHECK CONSTRAINT [FK_Atracciones_Ciudades1]
GO
ALTER TABLE [dbo].[Clima]  WITH CHECK ADD  CONSTRAINT [FK_Clima_Ciudades] FOREIGN KEY([id_ciudad])
REFERENCES [dbo].[Ciudades] ([id_ciudad])
GO
ALTER TABLE [dbo].[Clima] CHECK CONSTRAINT [FK_Clima_Ciudades]
GO
ALTER TABLE [dbo].[Comentarios]  WITH CHECK ADD  CONSTRAINT [FK_Comentarios_Temas] FOREIGN KEY([id_tema])
REFERENCES [dbo].[Temas] ([id_tema])
GO
ALTER TABLE [dbo].[Comentarios] CHECK CONSTRAINT [FK_Comentarios_Temas]
GO
ALTER TABLE [dbo].[Comentarios]  WITH CHECK ADD  CONSTRAINT [FK_Comentarios_Usuarioss] FOREIGN KEY([id_usuario])
REFERENCES [dbo].[Usuarioss] ([id_usuario])
GO
ALTER TABLE [dbo].[Comentarios] CHECK CONSTRAINT [FK_Comentarios_Usuarioss]
GO
ALTER TABLE [dbo].[Fotos_atracciones]  WITH CHECK ADD  CONSTRAINT [FK_Fotos_atracciones_Atracciones] FOREIGN KEY([id_atraccion])
REFERENCES [dbo].[Atracciones] ([id_atraccion])
GO
ALTER TABLE [dbo].[Fotos_atracciones] CHECK CONSTRAINT [FK_Fotos_atracciones_Atracciones]
GO
ALTER TABLE [dbo].[Fotos_ciudades]  WITH CHECK ADD  CONSTRAINT [FK_Fotos_ciudades_Ciudades] FOREIGN KEY([id_ciudad])
REFERENCES [dbo].[Ciudades] ([id_ciudad])
GO
ALTER TABLE [dbo].[Fotos_ciudades] CHECK CONSTRAINT [FK_Fotos_ciudades_Ciudades]
GO
ALTER TABLE [dbo].[Preguntas]  WITH CHECK ADD  CONSTRAINT [FK_Preguntas_Chat] FOREIGN KEY([id_categoria])
REFERENCES [dbo].[Chat] ([id_categoria])
GO
ALTER TABLE [dbo].[Preguntas] CHECK CONSTRAINT [FK_Preguntas_Chat]
GO
ALTER TABLE [dbo].[Union]  WITH CHECK ADD  CONSTRAINT [FK_Union_Atracciones] FOREIGN KEY([id_atraccion])
REFERENCES [dbo].[Atracciones] ([id_atraccion])
GO
ALTER TABLE [dbo].[Union] CHECK CONSTRAINT [FK_Union_Atracciones]
GO
ALTER TABLE [dbo].[Union]  WITH CHECK ADD  CONSTRAINT [FK_Union_Usuarioss] FOREIGN KEY([id_usuario])
REFERENCES [dbo].[Usuarioss] ([id_usuario])
GO
ALTER TABLE [dbo].[Union] CHECK CONSTRAINT [FK_Union_Usuarioss]
GO
USE [master]
GO
ALTER DATABASE [Viajar360] SET  READ_WRITE 
GO
