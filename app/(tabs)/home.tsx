import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  webiste: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data: User[] = await response.json();
        setUsers(data);
      } catch (e) {
        setError('Gagal mengambil data:' + e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex flex-1 bg-gray-100">
      <Text className="my-5 text-center text-3xl font-bold">Daftar Pengguna</Text>

      <View className='px-4 mb-4'>
        <TextInput className='bg-white p-3 rounded-lg shadow-md text-base' placeholder='Cari pengguna berdasarkan nama...' value={searchQuery} onChangeText={setSearchQuery} />
      </View>
      
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/modal',
              params: { user: JSON.stringify(item) },
            }}
            asChild>
            <TouchableOpacity className="mx-4 my-2 rounded-lg bg-white p-4 shadow-md active:opacity-70">
              <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
              <Text className="text-sm text-gray-500">{item.email}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
