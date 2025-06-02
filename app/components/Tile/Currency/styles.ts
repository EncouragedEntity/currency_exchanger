import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    padding: 8,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  leading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  trailing: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});