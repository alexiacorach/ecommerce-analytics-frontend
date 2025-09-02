# 📦 Package Tracking Frontend

Este es el **frontend** de la API RESTful de sistema de comercio electrónico.  
Está desarrollado en **React + TypeScript**, con estilos responsivos en **Bootstrap**.  
Se conecta con el **backend** ya implementado en este repositorio 👉 [ecommerce-analytics](https://github.com/alexiacorach/ecommerce-analytics).  

## 🚀 Funcionalidades principales

### 👤 Cliente
- **Registro y Login de usuarios** (con JWT).
- **Visualización de productos y carrito de compras**.
- **Checkout con formulario de envío** (dirección, ciudad, código postal, país).
- **Creación de órdenes de compra**.
- **Detalle de órdenes** con:
  - Estado de la orden (pendiente, pagada, enviada, entregada).
  - Lista de ítems con nombre, cantidad y precio.
  - Información de pago.
- **Simulación de pago** (el cliente puede marcar su orden como pagada).
- **Resumen de órdenes** con todo su historial.

### 🛠️ Administrador
- **Gestión de órdenes** (visualización de todas las órdenes creadas).
- **Dashboard de Analytics**:
  - Gráficos y estadísticas de ventas.
  - Ingresos totales.
  - Órdenes por estado.
  - Productos más vendidos.
  - Métricas clave para la toma de decisiones.

## 🛠️ Tecnologías utilizadas

- [React]
- [TypeScript]
- [Bootstrap] para diseño responsive
- [Axios] para llamadas a la API
- [ReactRouter] para navegación entre vistas
- [Recharts] para gráficos y visualizaciones

## 🔄 Flujo del cliente

1. **Registro/Login** → acceso con token JWT almacenado en `localStorage`.
2. **Selecciona productos** y los añade al **carrito**.
3. **Completa CheckoutForm** con datos de envío.
4. **Confirma la orden** → se guarda en la base de datos vía API.
5. Desde **OrderDetail**, el cliente puede:
   - Ver el estado de la orden.
   - Revisar los ítems comprados.
   - Simular un pago → cambia el estado a *pagada*.
6. Desde **OrderSummary**, el cliente ve todas sus órdenes.

## 🔄 Flujo del administrador

1. **Login como administrador**.  
2. Acceso al **Dashboard** con:
   - Gráfico de ingresos totales.
   - Número de órdenes creadas, pagadas y enviadas.
   - Ranking de productos más vendidos.
   - Estadísticas en tiempo real de actividad del sistema.
3. Posibilidad de crear productos y agregarlos al ecommerce.   
4. Posibilidad de **gestionar órdenes** (ver detalles, cambiar estado). 
