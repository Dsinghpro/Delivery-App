import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useCart, Product } from '../contexts/CartContext';
import productsDataRaw from '../assets/data/products.json';

const categories = ['Fruits', 'Vegetables', 'Grains', 'Oils'];

const productsData: Product[] = productsDataRaw as Product[];

const HomeScreen = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('Fruits');

  const products: Product[] = productsData.filter(
    (p: Product) => p.category === selectedCategory
  );

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome to QuickGrocer!</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryBtn, selectedCategory === cat && styles.selectedCategory]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>₹{item.price}</Text>
              <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                <Text style={styles.addBtnText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  greeting: { fontSize: 22, fontWeight: 'bold', marginLeft: 16, marginBottom: 10 },
  categoryScroll: { maxHeight: 50, marginBottom: 10, paddingLeft: 8 },
  categoryBtn: {
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginHorizontal: 6,
  },
  selectedCategory: { backgroundColor: '#4caf50' },
  categoryText: { fontSize: 16, color: '#333' },
  productList: { paddingHorizontal: 12, paddingBottom: 20 },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderRadius: 12,
    marginBottom: 14,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginRight: 16,
  },
  productInfo: { flex: 1 },
  productName: { fontSize: 18, fontWeight: '600' },
  productPrice: { fontSize: 16, color: '#4caf50', marginVertical: 4 },
  addBtn: {
    backgroundColor: '#4caf50',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  addBtnText: { color: '#fff', fontWeight: 'bold' },
});

export default HomeScreen; 