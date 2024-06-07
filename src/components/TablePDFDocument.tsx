import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface RowData {
  [key: string]: any;
}

interface Props {
  data: RowData[];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'center',
  },
  cell: {
    padding: 5,
    fontSize: 12,
  },
});

const TablePDFDocument: React.FC<Props> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Table Data</Text>
        {data.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <Text style={styles.cell} key={cellIndex}>{String(cell)}</Text>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default TablePDFDocument;
