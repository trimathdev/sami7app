import {
  Grid,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import PDF417 from "pdf417-generator";
import moment from "moment";
import useDte from "../hooks/useDte";



export default function Document(props) {
  const { documentData } = props;

  con



  const typeDocument = () => {
    switch (documentData.documentType) {
      case 1:
        return "Ticket";
      case 2:
        return "Boleta";
      case 3:
        return "Factura";
      default:
        return "Sin tipo de documento";
    }
  };

  useEffect(() => {
    const canvas = document.getElementById("barcodeCanvas");
    PDF417.draw(documentData.code, canvas);
  }, []);

  const ItemList = (items) => {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 10, p: 0, pl: 1 }}>#</TableCell>
              <TableCell sx={{ fontSize: 10, p: 0, pl: 1 }}>Producto</TableCell>
              <TableCell sx={{ fontSize: 10, p: 0, pl: 1 }}>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ fontSize: 10, p: 0, pl: 1 }}>
                  {item.quanty}
                </TableCell>
                <TableCell sx={{ fontSize: 10, p: 0, pl: 1 }}>
                  {item.name}
                </TableCell>
                <TableCell sx={{ fontSize: 10, p: 0, pl: 1 }}>
                  {item.total.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <Grid container spacing={1} direction={"column"} width={"80mm"}>
        <Grid item textAlign={"center"}>
          <Typography variant={"h7"} sx={{ p: 0, m: 0, lineHeight: 1 }}>
            {documentData.comerceInfo.fantasyName}
          </Typography>
          <Typography fontSize={10} sx={{ p: 0, m: 0, lineHeight: 1 }}>
            {documentData.comerceInfo.name}
          </Typography>
          <Typography fontSize={10} sx={{ p: 0, m: 0, lineHeight: 1 }}>
            {documentData.comerceInfo.rut}
          </Typography>
          <Typography fontSize={10} sx={{ p: 0, m: 0, lineHeight: 1 }}>
            {documentData.comerceInfo.address}
          </Typography>
          <Typography fontSize={10} sx={{ p: 0, m: 0, lineHeight: 1 }}>
            {documentData.comerceInfo.phone}
          </Typography>
        </Grid>
        <Grid
          item
          display={documentData.documentType == 1 ? "none" : "block"}
          textAlign={"center"}
        >
          <Typography
            fontSize={12}
            sx={{ p: 0, m: 0, lineHeight: 1, fontWeight: "bold" }}
          >
            {typeDocument() + " Nro " + documentData.referenceId}
          </Typography>
        </Grid>
        <Grid item textAlign={"center"}>
          <Typography
            fontSize={12}
            sx={{ p: 0, m: 0, lineHeight: 0.5, fontWeight: "bold" }}
          >
            {"Venta Nro " + documentData.saleId}
          </Typography>
        </Grid>

        <Grid item>{ItemList(documentData.items)}</Grid>

        <Grid item display={"flex"}>
          <Box>
            <Typography
              fontSize={12}
              sx={{ fontWeight: "bold", pl: 1, pr: 1 }}
              textAlign={"left"}
            >
              Pagos
            </Typography>
            {documentData.payments.map((payment) => (
              <Typography
                fontSize={10}
                sx={{ pl: 1, pr: 1, lineHeight: 1 }}
                textAlign={"left"}
              >
                {payment.paymentMethodName}{" "}
                {payment.amount.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </Typography>
            ))}
          </Box>
          <Box flexGrow={1}>
            <Typography
              fontSize={12}
              sx={{ fontWeight: "bold", pl: 1, pr: 1 }}
              textAlign={"right"}
            >
              Total a pagar:{" "}
              {documentData.total.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
            <Typography
              fontSize={10}
              sx={{ pl: 1, pr: 1, lineHeight: 1 }}
              textAlign={"right"}
            >
              Descuentos{" "}
              {documentData.discounts.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
            <Typography
              display={documentData.documentType == 1 ? "none" : "block"}
              fontSize={10}
              sx={{ pl: 1, pr: 1, lineHeight: 1 }}
              textAlign={"right"}
            >
              Total afecto{" "}
              {documentData.subjectTotal.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
            <Typography
              display={documentData.documentType == 1 ? "none" : "block"}
              fontSize={10}
              sx={{ pl: 1, pr: 1, lineHeight: 1 }}
              textAlign={"right"}
            >
              Total exento{" "}
              {documentData.exemptTotal.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
            <Typography
              fontSize={10}
              sx={{ pl: 1, pr: 1, lineHeight: 1 }}
              textAlign={"right"}
            >
              Vuelto{" "}
              {documentData.change.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </Typography>
          </Box>
        </Grid>

        <Grid item display={documentData.documentType == 1 ? "none" : "block"}>
          <Typography
            fontSize={10}
            textAlign={"center"}
            sx={{ p: 0, m: 0, lineHeight: 1 }}
          >
            El iva de esta {typeDocument()} es de{" "}
            {documentData.iva.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
          </Typography>
        </Grid>

        <Grid item textAlign={"center"} p={1} width={"100%"}>
          <canvas id="barcodeCanvas" height={"90px"} width={"90px"} />
        </Grid>
        <Grid item>
          <Typography
            fontSize={10}
            textAlign={"center"}
            sx={{ p: 0, m: 0, lineHeight: 1 }}
          >
            Fecha: {documentData.date} Hora: {documentData.time}
          </Typography>
        </Grid>
        <Grid item display={documentData.documentType == 1 ? "none" : "block"}>
          <Typography
            fontSize={8}
            textAlign={"center"}
            sx={{ p: 0, m: 0, lineHeight: 1 }}
          >
            Timbre Electronico SII
          </Typography>
          <Typography
            fontSize={8}
            textAlign={"center"}
            sx={{ p: 0, m: 0, lineHeight: 1 }}
          >
            Res. Nro 80 de 2014-08-22
          </Typography>
          <Typography
            fontSize={8}
            textAlign={"center"}
            sx={{ p: 0, m: 0, lineHeight: 1 }}
          >
            Verifique Documento en www.lioren.cl/consultabe
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

function documenteDataDefault() {
  return {
    documentType: 1,
    total: 0,
    subjectTotal: 0,
    exemptTotal: 0,
    discounts: 0,
    change: 0,
    iva: 0,
    code: "0",
    items: [],
    payments: [],
    saleId: 0,
    referenceId: 0,
    date: moment(new Date()).format("DD-MM-YYYY"),
    time: moment(new Date()).format("HH:mm:ss"),
    comerceInfo: {
      fantasyName: "Nombre del Comercio",
      name: "Razón social del Comercio",
      address: "Dirección del Comercio",
      phone: "Teléfono del Comercio",
      rut: "Rut del Comercio",
    },
  };
}
