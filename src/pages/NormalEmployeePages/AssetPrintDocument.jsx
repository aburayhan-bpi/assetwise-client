import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import moment from "moment/moment";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    borderBottom: "2px solid #2980b9",
    paddingBottom: 10,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ecf0f1",
    borderRadius: 5,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 5,
    borderBottom: "1px solid #bdc3c7",
    paddingBottom: 5,
  },
  field: {
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  value: {
    color: "#34495e",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
    color: "#7f8c8d",
    borderTop: "1px solid #bdc3c7",
    paddingTop: 10,
  },
});

// PDF Document Component
const AssetPrintDocument = ({ asset, companyInfo }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>{companyInfo?.company}</Text>

        {/* Company Info */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Company Details</Text>
          <Text style={styles.field}>
            <Text style={styles.label}>HR Name: </Text>
            <Text style={styles.value}>{companyInfo?.name}</Text>
          </Text>
          <Text style={styles.field}>
            <Text style={styles.label}>Company Email: </Text>
            <Text style={styles.value}>{companyInfo?.email}</Text>
          </Text>
        </View>

        {/* Asset Details */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Asset Information</Text>
          <Text style={styles.field}>
            <Text style={styles.label}>Asset Name: </Text>
            <Text style={styles.value}>{asset.productName}</Text>
          </Text>
          <Text style={styles.field}>
            <Text style={styles.label}>Type: </Text>
            <Text style={styles.value}>{asset.productType}</Text>
          </Text>
          <Text style={styles.field}>
            <Text style={styles.label}>Request Date: </Text>
            <Text style={styles.value}>{asset.requestDate}</Text>
          </Text>
          <Text style={styles.field}>
            <Text style={styles.label}>Approval Date: </Text>
            <Text style={styles.value}>{asset.approvalDate || "N/A"}</Text>
          </Text>
          <Text style={styles.field}>
            <Text style={styles.label}>Status: </Text>
            <Text style={styles.value}>{asset.status}</Text>
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Printing Date: {moment().format("MMMM Do YYYY, h:mm:ss a")}
        </Text>
      </Page>
    </Document>
  );
};

export default AssetPrintDocument;
