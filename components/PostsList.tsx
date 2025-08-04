import { useContext } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DataContext } from "../context/DataContext";
import { Post } from "../types/types";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (SCREEN_WIDTH - 36) / 2; 

export default function PostsList() {
  const { posts } = useContext(DataContext);

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
      <Text numberOfLines={2} style={styles.description}>{item.description}</Text>

      <View style={styles.detailGroup}>
        <Text style={styles.price}>₱{item.price}</Text>
        <Text style={styles.discount}>-{item.discountPercentage}%</Text>
      </View>

      <View style={styles.ratingCategory}>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product List</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 10,
    width: CARD_WIDTH,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  detailGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2a9d8f",
  },
  discount: {
    fontSize: 12,
    fontWeight: "600",
    color: "#e63946",
  },
  ratingCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rating: {
    fontSize: 12,
    color: "#f4a261",
  },
  category: {
    fontSize: 12,
    color: "#888",
  },
});
