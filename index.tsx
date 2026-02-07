import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  FlatList,
  SectionList,
  Switch,
  Modal,
  Alert,
  Keyboard,
  Animated,
} from 'react-native';

type CheckBoxProps = {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
};

const CheckBox = ({ value, onValueChange }: CheckBoxProps) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={[styles.checkboxBox, value && styles.checkboxBoxChecked]}>
      {value && <Text style={styles.checkboxTick}>✓</Text>}
    </TouchableOpacity>
  );
};

type Category = 'Coffee' | 'Tea' | 'Snacks' | 'Desserts';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: Category;
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'espresso',
    name: 'Signature Espresso',
    description: 'Rich, smooth shot pulled from freshly ground beans.',
    price: '₹120',
    category: 'Coffee',
  },
  {
    id: 'latte',
    name: 'Caramel Latte',
    description: 'Espresso with steamed milk and caramel drizzle.',
    price: '₹180',
    category: 'Coffee',
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: 'Slow-brewed 18 hours, served over ice.',
    price: '₹200',
    category: 'Coffee',
  },
  {
    id: 'masala-chai',
    name: 'Masala Chai',
    description: 'Indian spiced tea with milk, cardamom and ginger.',
    price: '₹90',
    category: 'Tea',
  },
  {
    id: 'green-tea',
    name: 'Lemon Green Tea',
    description: 'Light and refreshing with a hint of lemon.',
    price: '₹110',
    category: 'Tea',
  },
  {
    id: 'sandwich',
    name: 'Grilled Veggie Sandwich',
    description: 'Grilled vegetables, cheese and house sauce.',
    price: '₹210',
    category: 'Snacks',
  },
  {
    id: 'fries',
    name: 'Peri Peri Fries',
    description: 'Crispy fries tossed in peri peri seasoning.',
    price: '₹150',
    category: 'Snacks',
  },
  {
    id: 'brownie',
    name: 'Chocolate Brownie',
    description: 'Warm brownie with dark chocolate chunks.',
    price: '₹160',
    category: 'Desserts',
  },
  {
    id: 'cheesecake',
    name: 'Classic Cheesecake',
    description: 'Baked cheesecake with biscuit base.',
    price: '₹220',
    category: 'Desserts',
  },
];

const CATEGORIES: Array<'All' | Category> = ['All', 'Coffee', 'Tea', 'Snacks', 'Desserts'];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isTakeAway, setIsTakeAway] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const filteredItems =
    selectedCategory === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SectionList
          style={styles.menuList}
          contentContainerStyle={styles.menuContent}
          ListHeaderComponent={
            <View>
              <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
                <Text style={styles.cafeName}>Siddhanta&apos;s Cafe</Text>
                <Text style={styles.subtitle}>Digital Menu</Text>
                <View style={styles.statusRow}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Open Now</Text>
                  </View>
                  <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>{isTakeAway ? 'Take Away' : 'Dine In'}</Text>
                    <Switch value={isTakeAway} onValueChange={setIsTakeAway} />
                  </View>
                </View>
              </Animated.View>

              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=800&q=80',
                }}
                style={styles.heroImage}
              />

              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Any special request? (optional)"
                  value={specialRequest}
                  onChangeText={setSpecialRequest}
                />
              </View>

              <View style={styles.infoActionsRow}>
                <TouchableOpacity
                  style={styles.primaryAction}
                  onPress={() =>
                    Alert.alert('Order Help', 'A staff member will assist you shortly.')
                  }>
                  <Text style={styles.primaryActionText}>Call Staff</Text>
                </TouchableOpacity>
                <TouchableHighlight
                  style={styles.secondaryAction}
                  underlayColor="#d7b899"
                  onPress={() => setShowDetailsModal(true)}>
                  <Text style={styles.secondaryActionText}>View Offer</Text>
                </TouchableHighlight>
              </View>

              <View style={styles.checkboxRow}>
                <CheckBox value={acceptedTerms} onValueChange={setAcceptedTerms} />
                <Text style={styles.checkboxLabel}>I will confirm my order at the counter.</Text>
              </View>

              <View style={styles.categoryRow}>
                {CATEGORIES.map((category) => {
                  const isActive = category === selectedCategory;
                  return (
                    <TouchableOpacity
                      key={category}
                      style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                      onPress={() => setSelectedCategory(category)}>
                      <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <FlatList
                horizontal
                data={MENU_ITEMS.slice(0, 4)}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.popularList}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    style={styles.popularCard}
                    underlayColor="#f3e0c8"
                    onPress={() => setShowDetailsModal(true)}>
                    <View>
                      <Text style={styles.popularTitle}>{item.name}</Text>
                      <Text style={styles.popularPrice}>{item.price}</Text>
                    </View>
                  </TouchableHighlight>
                )}
              />

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.promoScroll}>
                <View style={styles.promoChip}>
                  <Text style={styles.promoText}>Best Sellers</Text>
                </View>
                <View style={styles.promoChip}>
                  <Text style={styles.promoText}>New Arrivals</Text>
                </View>
                <View style={styles.promoChip}>
                  <Text style={styles.promoText}>Chef&apos;s Choice</Text>
                </View>
              </ScrollView>
            </View>
          }
          sections={[
            {
              title: 'Coffee',
              data: MENU_ITEMS.filter((i) => i.category === 'Coffee'),
            },
            {
              title: 'Tea',
              data: MENU_ITEMS.filter((i) => i.category === 'Tea'),
            },
            {
              title: 'Snacks',
              data: MENU_ITEMS.filter((i) => i.category === 'Snacks'),
            },
            {
              title: 'Desserts',
              data: MENU_ITEMS.filter((i) => i.category === 'Desserts'),
            },
          ]}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.menuCard}>
              <View style={styles.menuHeaderRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
            </View>
          )}
          ListFooterComponent={
            <View>
              <Text style={styles.footerText}>
                Please place your order at the counter after choosing from this digital menu.
              </Text>
              <View style={styles.footerButtonRow}>
                <Button
                  title="Confirm Order Summary"
                  onPress={() =>
                    Alert.alert(
                      'Order Summary',
                      'Your items are noted. Please confirm and pay at the counter.'
                    )
                  }
                />
              </View>
            </View>
          }
        />

        <Modal visible={showDetailsModal} transparent animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Today&apos;s Offer</Text>
              <Text style={styles.modalText}>
                Get 10% off on any Coffee + Dessert combo at Siddhanta&apos;s Cafe.
              </Text>
              <Button title="Close" onPress={() => setShowDetailsModal(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 16,
    backgroundColor: '#f5e6d3',
  },
  header: {
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cafeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a2b18',
  },
  subtitle: {
    fontSize: 16,
    color: '#7a5a3a',
    marginTop: 4,
  },
  statusBadge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#2ecc71',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c8b299',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  categoryChipActive: {
    backgroundColor: '#8d5b34',
    borderColor: '#8d5b34',
  },
  categoryText: {
    fontSize: 13,
    color: '#4a2b18',
  },
  categoryTextActive: {
    color: 'white',
  },
  menuList: {
    flex: 1,
    marginTop: 8,
  },
  menuContent: {
    paddingBottom: 24,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
    color: '#3a2415',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8d5b34',
  },
  itemDescription: {
    fontSize: 13,
    color: '#6b4a32',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 11,
    color: '#a07a52',
  },
  footerText: {
    fontSize: 12,
    color: '#6b4a32',
    marginTop: 8,
    textAlign: 'center',
  },
  heroImage: {
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
  },
  inputRow: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d3b89b',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  infoActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  primaryAction: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#8d5b34',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryActionText: {
    color: 'white',
    fontWeight: '600',
  },
  secondaryAction: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f0d8b8',
    alignItems: 'center',
  },
  secondaryActionText: {
    color: '#4a2b18',
    fontWeight: '600',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#8d5b34',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5e6d3',
  },
  checkboxBoxChecked: {
    backgroundColor: '#8d5b34',
  },
  checkboxTick: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 12,
    color: '#6b4a32',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    fontSize: 12,
    color: '#4a2b18',
  },
  popularList: {
    paddingVertical: 8,
  },
  popularCard: {
    backgroundColor: '#fff5e6',
    borderRadius: 10,
    padding: 10,
    marginRight: 8,
  },
  popularTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3a2415',
  },
  popularPrice: {
    fontSize: 12,
    color: '#8d5b34',
    marginTop: 2,
  },
  promoScroll: {
    paddingVertical: 8,
  },
  promoChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0d8b8',
    marginRight: 8,
  },
  promoText: {
    fontSize: 12,
    color: '#4a2b18',
    fontWeight: '500',
  },
  sectionList: {
    marginTop: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
    color: '#4a2b18',
  },
  sectionItem: {
    fontSize: 12,
    color: '#6b4a32',
    marginLeft: 8,
    marginTop: 2,
  },
  footerButtonRow: {
    marginTop: 12,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default App;
