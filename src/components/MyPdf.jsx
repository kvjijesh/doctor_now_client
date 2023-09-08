import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    padding: 20,
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: '20px'

  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  prescription: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: "20px",

  }
  ,
  line: {
    borderBottom: '1px solid black',
    marginBottom: 20,
  },

});



function MyPDF({ data, user }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.heading}>
          <Text>Rx</Text>
          <Text>Doctor Now</Text>
        </View>
        <View style={styles.line}></View>

        <View style={styles.container}>
          <View style={styles.column}>
            <Text style={styles.label}>Name : {user?.name}</Text>
            <Text style={styles.label}>Place : {user?.city}</Text>
            <Text style={styles.label}>Mobile : {user?.mobile}</Text>

          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Doctor : {data?.doctorId.name}</Text>
            <Text style={styles.label}>Department:{data?.doctorId.specialisation}</Text>
            <Text style={styles.label}>Date : {data?.slot}</Text>

          </View>
        </View>
        <View>
          <Text style={styles.prescription}>Diagnosis</Text>
          <Text style={styles.label}>{data?.findings}</Text>

        </View>
        <View>
          <Text style={styles.prescription}>Prescription</Text>
          {data.prescription.map((medicine, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.label}>{index + 1}.{medicine?.medicine}-{medicine?.frequency}</Text>
            </View>
          ))}
        </View>
        <View>
          <Text style={styles.prescription}>Advice</Text>
          <Text style={styles.label}>{data?.advice}</Text>

        </View>
      </Page>
    </Document>
  );

}

export default MyPDF;