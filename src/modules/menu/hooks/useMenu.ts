import { useState, useEffect } from 'react';
import { MenuItem, MenuCategory } from '../../../types/menu';
import menuService from '../services/menuService';
import { message } from 'antd';

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch menu items
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await menuService.getAllMenuItems();
      setMenuItems(items);
      setFilteredItems(items);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Không thể tải danh sách món ăn';
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const cats = await menuService.getMenuCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Filter items by category and search query
  useEffect(() => {
    let filtered = [...menuItems];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
    }

    setFilteredItems(filtered);
  }, [menuItems, selectedCategory, searchQuery]);

  // Initial fetch
  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  // Handler functions
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const refreshMenu = () => {
    fetchMenuItems();
  };

  return {
    menuItems: filteredItems,
    allMenuItems: menuItems,
    categories,
    selectedCategory,
    searchQuery,
    loading,
    error,
    handleCategoryChange,
    handleSearch,
    refreshMenu,
  };
};

export default useMenu;
