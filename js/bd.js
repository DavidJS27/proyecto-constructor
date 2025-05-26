function datos() {
    // Datos de prueba para usuarios.
    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.length === 0) {
        const usuarios = [
            {
                idusuario: 1,
                cedula: "1234567",
                nombre: "Juan",
                apellido: 'Torres',
                celular: "0981123456",
                usuario: "admin",
                contrasena: "admin",
                rol: "administrador",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 2,
                cedula: "2345678",
                nombre: "Gustavo",
                apellido: 'Benitez',
                celular: "0982234567",
                usuario: "jefe",
                contrasena: "jefe123",
                rol: "jefe_obra",
                estado: "activo",
                permisos: ['dashboard', 'usuarios', 'cobros-clientes', 'registro-perdidas']
            },
            {
                idusuario: 3,
                cedula: "3456789",
                nombre: "Lourdes",
                apellido: 'Torres',
                celular: "0983345678",
                usuario: "gerente",
                contrasena: "gerente123",
                rol: "gerente",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 4,
                cedula: "4567890",
                nombre: "Nelson",
                apellido: 'Martinez',
                celular: "0984456789",
                usuario: "obrero",
                contrasena: "obrero123",
                rol: "obrero",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 5,
                cedula: "5678901",
                nombre: "Luana",
                apellido: 'Alarcón',
                celular: "0985567890",
                usuario: "contadora",
                contrasena: "contador123",
                rol: "contador",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 6,
                cedula: "6789012",
                nombre: "Thaiel",
                apellido: 'Duarte',
                celular: "0986678901",
                usuario: "codificador",
                contrasena: "codifica123",
                rol: "codificador",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 7,
                cedula: "7890123",
                nombre: "Tania",
                apellido: 'Sanabria',
                celular: "0987789012",
                usuario: "luisa",
                contrasena: "luisa123",
                rol: "jefe_obra",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 8,
                cedula: "8901234",
                nombre: "Thiago",
                apellido: 'Bidondo',
                celular: "0988890123",
                usuario: "roberto",
                contrasena: "roberto123",
                rol: "obrero",
                estado: "inactivo",
                permisos: []
            },
            {
                idusuario: 9,
                cedula: "9012345",
                nombre: "Derlis",
                apellido: 'Diaz',
                celular: "0989901234",
                usuario: "sofia",
                contrasena: "sofia123",
                rol: "contador",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 10,
                cedula: "0123456",
                nombre: "Alan",
                apellido: 'Turing',
                celular: "0980012345",
                usuario: "miguel",
                contrasena: "miguel123",
                rol: "codificador",
                estado: "activo",
                permisos: []
            }
        ];
        
        localStorage.setItem("usuarios", JSON.stringify(usuarios));                    
    }

    // Cargar datos de prueba clientes
    var clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    if (clientes.length === 0) {
        const clientes = [
            {
                idCliente: 1,
                rucCi: "4.598.523-2",
                razonSocial: "Municipalidad de Concepción",
                direccion: "Av. Pdte. Franco c/ Brasil, Concepción",
                telefono: "0331 242209",
                celular: "0971 528623",
                email: "municipalidad.concepcion@gmail.com",
                ciudad: "Concepción",
                observaciones: "Cliente institucional",
                estado: true
            },
            {
                idCliente: 2,
                rucCi: "80032588-0",
                razonSocial: "Santa Catalina S.A.",
                direccion: "Juan E. O'Leary 1234, Asunción",
                telefono: "021 456789",
                celular: "0981 234567",
                email: "santacatalina.sa@gmail.com",
                ciudad: "Concepción",
                observaciones: "Empresa contratista principal",
                estado: true
            },
            {
                idCliente: 3,
                rucCi: "3.452.987-5",
                razonSocial: "Juan Pérez",
                direccion: "Calle Mariscal López 234, Concepción",
                telefono: "",
                celular: "0972 345678",
                email: "juan.perez@gmail.com",
                ciudad: "Concepción",
                observaciones: "Cliente particular",
                estado: true
            },
            {
                idCliente: 4,
                rucCi: "80045789-3",
                razonSocial: "ANDE",
                direccion: "Avda. España 1268, Asunción",
                telefono: "021 248111",
                celular: "0981 123456",
                email: "contacto@ande.gov.py",
                ciudad: "Asunción",
                observaciones: "Empresa estatal de energía",
                estado: true
            },
            {
                idCliente: 5,
                rucCi: "1.234.567-8",
                razonSocial: "María González",
                direccion: "Calle Independencia 567, Concepción",
                telefono: "0331 123456",
                celular: "0975 987654",
                email: "maria.gonzalez@gmail.com",
                ciudad: "Concepción",
                observaciones: "Cliente particular - proyecto residencial",
                estado: false
            },
            {
                idCliente: 6,
                rucCi: "2.345.678-9",
                razonSocial: "Constructora Norteña",
                direccion: "Ruta 5 Km 10, Concepción",
                telefono: "0331 654321",
                celular: "0982 111222",
                email: "info@nortena.com.py",
                ciudad: "Concepción",
                observaciones: "Empresa constructora local",
                estado: true
            },
            {
                idCliente: 7,
                rucCi: "80012345-6",
                razonSocial: "Supermercado Central",
                direccion: "Av. Central 1000, Horqueta",
                telefono: "0332 123456",
                celular: "0983 333444",
                email: "contacto@supercentral.com.py",
                ciudad: "Horqueta",
                observaciones: "Cliente comercial",
                estado: true
            },
            {
                idCliente: 8,
                rucCi: "4.321.987-0",
                razonSocial: "Pedro López",
                direccion: "Calle Palma 789, Concepción",
                telefono: "",
                celular: "0976 555666",
                email: "pedro.lopez@gmail.com",
                ciudad: "Concepción",
                observaciones: "Cliente particular",
                estado: false
            },
            {
                idCliente: 9,
                rucCi: "80098765-4",
                razonSocial: "Hospital Regional",
                direccion: "Av. Médicos del Chaco 200, Concepción",
                telefono: "0331 222333",
                celular: "0984 777888",
                email: "hospitalregional@salud.gov.py",
                ciudad: "Concepción",
                observaciones: "Cliente institucional - salud",
                estado: true
            },
            {
                idCliente: 10,
                rucCi: "5.678.901-2",
                razonSocial: "Estancia La Esperanza",
                direccion: "Colonia San Juan, Concepción",
                telefono: "0331 987654",
                celular: "0977 999000",
                email: "contacto@laesperanza.com.py",
                ciudad: "Concepción",
                observaciones: "Cliente rural",
                estado: true
            },
            {
                idCliente: 11,
                rucCi: "2747123-2",
                razonSocial: 'Lorena García',
                direccion: 'Calle Última c/ Mcal. López, Loreto',
                telefono: '',
                celular: '0991 454396',
                email: 'lorgarcia@gmail.com',
                ciudad: 'Loreto',
                observaciones: '',
                estado: true
            }
        ];
            
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    // Datos de prueba para categorias.
    const categorias = [
        {
            idcategoria: 1,
            categoria: 'cemento'
        },
        {
            idcategoria: 2,
            categoria: 'arena'
        },
        {
            idcategoria: 3,
            categoria: 'hierro'
        },
        {
            idcategoria: 4,
            categoria: 'pintura'
        },
        {
            idcategoria: 5,
            categoria: 'madera'
        },
        {
            idcategoria: 6,
            categoria: 'plomeria'
        },
        {
            idcategoria: 7,
            categoria: 'techo'
        },
        {
            idcategoria: 8,
            categoria: 'electricidad'
        },
        {
            idcategoria: 3,
            categoria: 'otro'
        }
    ]

    localStorage.setItem("categorias", JSON.stringify(categorias));  

    // Datos de prueba para materiales.
    var materiales = JSON.parse(localStorage.getItem("materiales")) || [];
    if (materiales.length === 0) {
        const materiales= [
            {
                idMaterial: 1,
                codbarra: "1020304050600",
                descripcion: "Cemento Vallemi",
                precio: 52000,
                stock: 150,
                unidad: "bolsa 50kg",
                categoria: "cemento",
                observaciones: "Bolsas de 50 kg, fabricado en Paraguay",
                stockMinimo: 50
            },
            {
                idMaterial: 2,
                codbarra: "1122536585870",
                descripcion: "Cemento CECON",
                precio: 50000,
                stock: 800,
                unidad: "bolsa 50kg",
                categoria: "cemento",
                observaciones: "Bolsas de 50 kg, fabricado en Paraguay",
                stockMinimo: 50
            },
            {
                idMaterial: 3,
                codbarra: "1234567890123",
                descripcion: "Arena lavada",
                precio: 180000,
                stock: 120,
                unidad: "m3",
                categoria: "arena",
                observaciones: "Arena para mezclas, proveniente del río Paraguay",
                stockMinimo: 20
            },
            {
                idMaterial: 4,
                codbarra: "2345678901234",
                descripcion: "Varilla conformada de 6mm",
                precio: 15000,
                stock: 50,
                unidad: "unidad",
                categoria: "hierro",
                observaciones: "Barras de 12 metros de longitud",
                stockMinimo: 100
            },
            {
                idMaterial: 5,
                codbarra: "3456789012345",
                descripcion: "Varilla conformada de 8mm",
                precio: 25000,
                stock: 55,
                unidad: "unidad",
                categoria: "hierro",
                observaciones: "Barras de 12 metros de longitud",
                stockMinimo: 100
            },
            {
                idMaterial: 6,
                codbarra: "4567890123456",
                descripcion: "Varilla conformada de 10mm",
                precio: 40000,
                stock: 40,
                unidad: "unidad",
                categoria: "hierro",
                observaciones: "Barras de 12 metros de longitud",
                stockMinimo: 100
            },
            {
                idMaterial: 7,
                codbarra: "5678901234567",
                descripcion: "Varilla conformada de 12mm",
                precio: 57000,
                stock: 35,
                unidad: "unidad",
                categoria: "hierro",
                observaciones: "Barras de 12 metros de longitud",
                stockMinimo: 100
            },
            {
                idMaterial: 8,
                codbarra: "8901234567670",
                descripcion: "Varilla conformada de 16mm",
                precio: 98000,
                stock: 20,
                unidad: "unidad",
                categoria: "hierro",
                observaciones: "Barras de 12 metros de longitud",
                stockMinimo: 100
            },
            {
                idMaterial: 9,
                codbarra: "9012345674158",
                descripcion: "Ladrillo hueco de 6 agujeros",
                precio: 3000,
                stock: 2500,
                unidad: "unidad",
                categoria: "otro",
                observaciones: "Ladrillos cerámicos para paredes internas",
                stockMinimo: 500
            },
            {
                idMaterial: 21,
                codbarra: "9012345674789",
                descripcion: "Ladrillo hueco de 8 agujeros",
                precio: 3500,
                stock: 2000,
                unidad: "unidad",
                categoria: "otro",
                observaciones: "Ladrillos cerámicos para paredes internas",
                stockMinimo: 500
            },
            {
                idMaterial: 10,
                codbarra: "9012345674567",
                descripcion: "Ladrillo comun rojo",
                precio: 1600,
                stock: 6000,
                unidad: "unidad",
                categoria: "otro",
                observaciones: "Ladrillos cerámicos para paredes externas",
                stockMinimo: 500
            },
            {
                idMaterial: 11,
                codbarra: "9012345671465",
                descripcion: "Ladrillo comun blanco",
                precio: 1600,
                stock: 4000,
                unidad: "unidad",
                categoria: "otro",
                observaciones: "Ladrillos cerámicos para paredes externas",
                stockMinimo: 500
            },
            {
                idMaterial: 12,
                codbarra: "0158875236694",
                descripcion: "Ladrillo visto",
                precio: 4000,
                stock: 6000,
                unidad: "unidad",
                categoria: "otro",
                observaciones: "Ladrillos cerámicos para paredes externas",
                stockMinimo: 500
            },
            {
                idMaterial: 13,
                codbarra: "0123669874551",
                descripcion: "Pintur Suvinil clasica 18l",
                precio: 623000,
                stock: 32,
                unidad: "litros",
                categoria: "pintura",
                observaciones: "Pintura lavable, 18 litros, color Arena",
                stockMinimo: 15
            },
            {
                idMaterial: 14,
                codbarra: "4569987552001",
                descripcion: "Madera terciada 6mm",
                precio: 25000,
                stock: 30,
                unidad: "unidad",
                categoria: "madera",
                observaciones: "Tirantes de 3 metros, para encofrado",
                stockMinimo: 10
            },
            {
                idMaterial: 15,
                codbarra: "1455966300257",
                descripcion: "Caño PVC para desagüe 150mm",
                precio: 85000,
                stock: 50,
                unidad: "unidad",
                categoria: "plomeria",
                observaciones: "Caños de 6 metros soldable, marca Tigre",
                stockMinimo: 20
            },
            {
                idMaterial: 16,
                codbarra: "2300587400159",
                descripcion: "Porcelanato pulido 60x60cm",
                precio: 95000,
                stock: 200,
                unidad: "m2",
                categoria: "ceramica",
                observaciones: "Color beige, primera calidad, alto tránsito",
                stockMinimo: 50
            },
            {
                idMaterial: 17,
                codbarra: "0289647233658",
                descripcion: "Chapa Térmoacústica galbalum",
                precio: 285000,
                stock: 12,
                unidad: "m",
                categoria: "techo",
                observaciones: "Chapas de 3.60 metros, 3cm de espesor",
                stockMinimo: 10
            },
            {
                idMaterial: 18,
                codbarra: "4786953298402",
                descripcion: "Cable multifilar 2.5mm",
                precio: 145000,
                stock: 500,
                unidad: "m",
                categoria: "electricidad",
                observaciones: "Cable multifilar, color negro, normalizado",
                stockMinimo: 200
            },
            {
                idMaterial: 19,
                codbarra: "1478523695246",
                descripcion: "Cieloraso pvc 8mm",
                precio: 60000,
                stock: 50,
                unidad: "m2",
                categoria: "techo",
                observaciones: "Color blanco, techo falso",
                stockMinimo: 2
            },
            {
                idMaterial: 20,
                codbarra: "1249586235847",
                descripcion: "Piedra triturada 4ta",
                precio: 980000,
                stock: 45,
                unidad: "m3",
                categoria: "arena",
                observaciones: "Para preparación de hormigón",
                stockMinimo: 15
            }
        ];
        
        localStorage.setItem("materiales", JSON.stringify(materiales));
    }
    
    // Datos de prueba para proveedores.
    let proveedores = [
        {
            idProveedor: 1,
            ruc: "1234567-0",
            razonsocial: "CONCRENORTE S.A.",
            direccion: "AV. PTE. FRANCO C/ VIRGEN DEL ROSARIO",
            telefono: "0331-123456",
            correo_electronico: 'CONCRENOR@GMAIL.COM',
            ciudad: "CONCEPCIÓN",
            estado: "activo"
        },
        {
            idProveedor: 2,
            ruc: "5400300-1",
            razonsocial: "FERRETERIA R. CARRILLO",
            direccion: "AV. MARISCAL LOPEZ",
            telefono: "0971-102030",
            correo_electronico: 'RCARRILLO@GMAIL.COM',
            ciudad: "HORQUETA",
            estado: "activo"
        },
        {
            idProveedor: 3,
            ruc: "801234567-1",
            razonsocial: "TECHO S.R.L",
            direccion: "AV. RODRIGUEZ DE FRANCIA 1050",
            telefono: "0981-302010",
            correo_electronico: 'TECHO@GMAIL.COM',
            ciudad: "PEDRO JUAN CABALLERO",
            estado: "activo"
        }
    ];

    localStorage.setItem("proveedores", JSON.stringify(proveedores));

    // Datos de prueba para compras a proveedores.
    var comprascabecera = [
        {
            idcompra: 1,
            idproveedor: 1,
            numfactura: "001-001-0000001",
            feccompra: "2025-05-05",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 900000,
            totcompra: 900000,
            liqiva5: 0,
            liqiva10: 81818,
            totiva: 81818,
            saldo: 0,
            anulado: "NO"
        },
        {
            idcompra: 2,
            idproveedor: 2,
            numfactura: "001-001-0000002",
            feccompra: "2025-05-10",
            condicion: "CRÉDITO",
            stexenta: 0,
            stiva5: 500000,
            stiva10: 0,
            totcompra: 500000,
            liqiva5: 23810,
            liqiva10: 0,
            totiva: 23810,
            saldo: 500000,
            anulado: "NO"
        },
        {
            idcompra: 3,
            idproveedor: 3,
            numfactura: "001-001-0000003",
            feccompra: "2025-05-15",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 300000,
            totcompra: 300000,
            liqiva5: 0,
            liqiva10: 27272,
            totiva: 27272,
            saldo: 0,
            anulado: "NO"
        },
        {
            idcompra: 4,
            idproveedor: 1,
            numfactura: "001-001-0000004",
            feccompra: "2025-05-20",
            condicion: "CRÉDITO",
            stexenta: 0,
            stiva5: 200000,
            stiva10: 0,
            totcompra: 200000,
            liqiva5: 9524,
            liqiva10: 0,
            totiva: 9524,
            saldo: 200000,
            anulado: "NO"
        },
        {
            idcompra: 5,
            idproveedor: 2,
            numfactura: "001-001-0000005",
            feccompra: "2025-05-25",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 150000,
            totcompra: 150000,
            liqiva5: 0,
            liqiva10: 13636,
            totiva: 13636,
            saldo: 0,
            anulado: "NO"
        },
        {
            idcompra: 6,
            idproveedor: 2,
            numfactura: "001-001-0000010",
            feccompra: "2025-05-25",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 150000,
            totcompra: 150000,
            liqiva5: 0,
            liqiva10: 13636,
            totiva: 13636,
            saldo: 0,
            anulado: "NO"
        },
        {
            idcompra: 7,
            idproveedor: 2,
            numfactura: "001-001-0000022",
            feccompra: "2025-05-25",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 150000,
            totcompra: 150000,
            liqiva5: 0,
            liqiva10: 13636,
            totiva: 13636,
            saldo: 0,
            anulado: "NO"
        }
    ];

    var comprasdetalle = [
        {
            idcompradet: 1,
            idcompra: 1,
            item: 1,
            idmaterial: 2,
            cantidad: 10,
            preuni: 50000,
            tiva: 10,
            subtotal: 500000
        },
        {
            idcompradet: 2,
            idcompra: 1,
            item: 2,
            idmaterial: 1,
            cantidad: 8,
            preuni: 52000,
            tiva: 10,
            subtotal: 416000
        },
        {
            idcompradet: 3,
            idcompra: 2,
            item: 1,
            idmaterial: 3,
            cantidad: 5,
            preuni: 100000,
            tiva: 5,
            subtotal: 500000
        },
        {
            idcompradet: 4,
            idcompra: 3,
            item: 1,
            idmaterial: 4,
            cantidad: 10,
            preuni: 30000,
            tiva: 10,
            subtotal: 300000
        },
        {
            idcompradet: 5,
            idcompra: 4,
            item: 1,
            idmaterial: 5,
            cantidad: 4,
            preuni: 50000,
            tiva: 5,
            subtotal: 200000
        },
        {
            idcompradet: 6,
            idcompra: 5,
            item: 1,
            idmaterial: 6,
            cantidad: 3,
            preuni: 50000,
            tiva: 10,
            subtotal: 150000
        }
    ];

    localStorage.setItem("comprascabecera", JSON.stringify(comprascabecera));
    localStorage.setItem("comprasdetalle", JSON.stringify(comprasdetalle));

    // Datos de prueba para obras
    var obras = JSON.parse(localStorage.getItem("obras")) || [];
    if (obras.length === 0) {
        const obras = [
            {
                idObra: 1,
                nombre: "Casa Familiar López",
                direccion: "Avda. Brasil 123, Concepción",
                dimensiones: 180,
                fechaInicio: "2024-01-15",
                fechaFin: "2024-06-30",
                observaciones: 'En esta casa ocurrió el asesinato de John F. Kennedy',
                total: 1500000,
                pagos: [],
                estado: 'en progreso',
                cliente: 8
            },
            {
                idObra: 2,
                nombre: "Edificio Rivas",
                direccion: "Calle Palma 456, Concepción",
                dimensiones: 950,
                fechaInicio: "2023-11-10",
                fechaFin: "2024-12-20",
                observaciones: '',
                total: 4500000,
                pagos: [],
                estado: 'en progreso',
                cliente: 6
            },
            {
                idObra: 3,
                nombre: "Refacción Vivienda González",
                direccion: "Ruta 5 km 8, Horqueta",
                dimensiones: 320,
                fechaInicio: "2024-03-01",
                fechaFin: null,
                observaciones: '',
                total: 7450000,
                pagos: [],
                estado: 'en progreso',
                cliente: 5
            },
            {
                idObra: 4,
                nombre: "Vivienda Social López",
                direccion: "Barrio San Luis, Concepción",
                dimensiones: 100,
                fechaInicio: "2024-04-05",
                fechaFin: null,
                observaciones: '',
                total: 2300000,
                pagos: [],
                estado: 'en progreso',
                cliente: 8
            },
            {
                idObra: 5,
                nombre: "Estancia La Esperanza Vivienda",
                direccion: "Paso Barreto",
                dimensiones: 600,
                fechaInicio: "2023-09-18",
                fechaFin: "2024-05-10",
                observaciones: '',
                total: 1450000,
                pagos: [],
                estado: 'en progreso',
                cliente: 10
            },
            {
                idObra: 6,
                nombre: "Refacción Hospital Regional",
                direccion: "Avda. Pinedo 1010, Concepción",
                dimensiones: 450,
                fechaInicio: "2024-02-20",
                fechaFin: null,
                observaciones: '',
                total: 450000,
                pagos: [],
                estado: 'en progreso',
                cliente: 9
            },
            {
                idObra: 7,
                nombre: "Locales Comerciales El Trebol",
                direccion: "Ruta 5 y calle 12, Concepción",
                dimensiones: 780,
                fechaInicio: "2023-10-25",
                fechaFin: "2024-08-15",
                observaciones: '',
                total: 5000000,
                pagos: [],
                estado: 'en progreso',
                cliente: 6
            },
            {
                idObra: 8,
                nombre: "Casa Moderna García",
                direccion: "Callejón Guaraní 234, Loreto",
                dimensiones: 210,
                fechaInicio: "2024-05-10",
                fechaFin: null,
                observaciones: '',
                total: 8100000,
                pagos: [],
                estado: 'en progreso',
                cliente: 11
            },
            {
                idObra: 9,
                nombre: "Ampliación Deposito A - Fortificados",
                direccion: "B° San Antonio, Concepción",
                dimensiones: 160,
                fechaInicio: "2024-01-08",
                fechaFin: "2024-04-22",
                observaciones: '',
                total: 17899400,
                pagos: [],
                estado: 'en progreso',
                cliente: 2
            },
            {
                idObra: 10,
                nombre: "Complejo Deportivo Juventud",
                direccion: "Barrio Itacurubí, Concepción",
                dimensiones: 1200,
                fechaInicio: "2023-12-01",
                fechaFin: null,
                observaciones: '',
                total: 1500000,
                pagos: [],
                estado: 'en progreso',
                cliente: 1
            }
        ];

        localStorage.setItem("obras", JSON.stringify(obras));
    }

    // Datos de prueba para asignación de materiales a obras
    var asignacionMaterialCabecera = JSON.parse(localStorage.getItem("asignacionMaterialCabecera")) || [];
    if (asignacionMaterialCabecera.length === 0) {
        const asignacionMaterialCabecera = [
            {
                idAsignacion: 1,
                idObra: 1,
                fechaAsignacion: '2025-05-25',
                totalPresupuesto: 3795000,
                usuario: 1,
                observaciones: 'Asignaciones correspondientes al presupuesto inicial proporcionado'
            },
        ]

        localStorage.setItem("asignacionMaterialCabecera", JSON.stringify(asignacionMaterialCabecera));
    }

    var asignacionMaterialDetalle = JSON.parse(localStorage.getItem("asignacionMaterialDetalle")) || [];
    if (asignacionMaterialDetalle.length === 0) {
        const asignacionMaterialDetalle = [
            {
                idDetalle: 1,
                idAsignacion: 1,
                idMaterial: 9,
                cantidad: 500,
                subtotal:1500000
            },
            {
                idDetalle: 2,
                idAsignacion: 1,
                idMaterial: 1, 
                cantidad: 10,
                subtotal: 520000
            },
            {
                idDetalle: 3,
                idAsignacion: 1,
                idMaterial: 3,
                cantidad: 5,
                subtotal: 900000
            },
            {
                idDetalle: 4,
                idAsignacion: 1,
                idMaterial: 5,
                cantidad: 35,
                subtotal: 875000
            },
        ]

        localStorage.setItem("asignacionMaterialDetalle", JSON.stringify(asignacionMaterialDetalle));
    }

    // Datos de prueba para el movimiento de materiales
    var movimientoMaterialCabecera = JSON.parse(localStorage.getItem("movimientoMaterialCabecera")) || [];
    if (movimientoMaterialCabecera.length === 0) {
        const movimientoMaterialCabecera = [
            {
                idMovimiento: 1,
                fecha: "2025-05-24",
                tipoMovimiento:'EGRESO',
                origenObraId: '',   
                destinoObraId: 1,
                observaciones: '',
                usuario: 1
            },
            // Ejemplo de traslado de un material de la obra A a B
            // {
            //     idMovimiento: 2,
            //     fecha: "2025-05-24",
            //     tipoMovimiento: 'TRASLADO',
            //     origenObraId: A,
            //     destinoObraId: B,
            //     observaciones: 'Traslado de materiales sobrantes de A a B',
            //     usuario: 1
            // }
        ]

        localStorage.setItem('movimientoMaterialCabecera', JSON.stringify(movimientoMaterialCabecera));
    }

    var movimientoMaterialDetalle = JSON.parse(localStorage.getItem("movimientoMaterialDetalle")) || [];
    if (movimientoMaterialDetalle.length === 0) {
        const movimientoMaterialDetalle = [
            {
                idDetalle: 1,
                idMovimiento: 1,
                idMaterial: 9,
                cantidad: 500
            },
            {
                idDetalle: 2,
                idMovimiento: 1,
                idMaterial: 1,
                cantidad: 10
            },
            {
                idDetalle: 3,
                idMovimiento: 1,
                idMaterial: 3,
                cantidad: 5
            },
            {
                idDetalle: 4,
                idMovimiento: 1,
                idMaterial: 5,
                cantidad: 35
            },
        ]

        localStorage.setItem('movimientoMaterialDetalle', JSON.stringify(movimientoMaterialDetalle));
    }

    // Datos de prueba para facturas de clientes
    var facturasclientes = JSON.parse(localStorage.getItem("facturasclientes")) || [];
    if (facturasclientes.length === 0) {
        const facturasclientes = [
            {
                idfactura: 1,
                fecha: "2025-05-10",
                numfactura: "001-001-0000001",
                idCliente: 2,
                condicion: "CONTADO",
                total: 1500000,
                iva: 150000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 2,
                fecha: "2025-05-12",
                numfactura: "001-001-0000002",
                idCliente: 4,
                condicion: "CRÉDITO",
                total: 2500000,
                iva: 250000,
                saldo: 2500000,
                anulado: "NO",
                fechaVencimiento: "2025-06-11"
            },
            {
                idfactura: 3,
                fecha: "2025-05-15",
                numfactura: "001-001-0000003",
                idCliente: 1,
                condicion: "CONTADO",
                total: 900000,
                iva: 90000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 4,
                fecha: "2025-05-18",
                numfactura: "001-001-0000004",
                idCliente: 5,
                condicion: "CRÉDITO",
                total: 1800000,
                iva: 180000,
                saldo: 1800000,
                anulado: "NO",
                fechaVencimiento: "2025-06-17"
            },
            {
                idfactura: 5,
                fecha: "2025-05-20",
                numfactura: "001-001-0000005",
                idCliente: 3,
                condicion: "CONTADO",
                total: 1200000,
                iva: 120000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            }
        ];
        localStorage.setItem("facturasclientes", JSON.stringify(facturasclientes));
    }

    // Datos de prueba para detalle de facturas de clientes
    var detallefacturacliente = JSON.parse(localStorage.getItem("detallefacturacliente")) || [];
    if (detallefacturacliente.length === 0) {
        const detallefacturacliente = [
            // Factura 1
            {
                idfacturadet: 1,
                idfactura: 1,
                item: 1,
                idMaterial: 1,
                cantidad: 10,
                preuni: 52000,
                tiva: 10,
                subtotal: 520000
            },
            {
                idfacturadet: 2,
                idfactura: 1,
                item: 2,
                idMaterial: 3,
                cantidad: 5,
                preuni: 196000,
                tiva: 10,
                subtotal: 980000
            },
            // Factura 2
            {
                idfacturadet: 3,
                idfactura: 2,
                item: 1,
                idMaterial: 2,
                cantidad: 20,
                preuni: 50000,
                tiva: 10,
                subtotal: 1000000
            },
            {
                idfacturadet: 4,
                idfactura: 2,
                item: 2,
                idMaterial: 5,
                cantidad: 30,
                preuni: 50000,
                tiva: 10,
                subtotal: 1500000
            },
            // Factura 3
            {
                idfacturadet: 5,
                idfactura: 3,
                item: 1,
                idMaterial: 10,
                cantidad: 500,
                preuni: 1800,
                tiva: 5,
                subtotal: 900000
            },
            // Factura 4
            {
                idfacturadet: 6,
                idfactura: 4,
                item: 1,
                idMaterial: 6,
                cantidad: 20,
                preuni: 90000,
                tiva: 10,
                subtotal: 1800000
            },
            // Factura 5
            {
                idfacturadet: 7,
                idfactura: 5,
                item: 1,
                idMaterial: 12,
                cantidad: 300,
                preuni: 4000,
                tiva: 10,
                subtotal: 1200000
            }
        ];
        localStorage.setItem("detallefacturacliente", JSON.stringify(detallefacturacliente));
    }
}