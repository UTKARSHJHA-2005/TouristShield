import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Function to get icon props based on notification type
const getIconProps = (type) => {
  switch (type) {
    case 'high_risk':
      return { icon: 'alert-circle', iconBgColor: '#fde9e9', iconColor: '#dc3545' };
    case 'safe_zone':
      return { icon: 'shield-check', iconBgColor: '#e9f5e9', iconColor: '#28a745' };
    case 'weather':
      return { icon: 'cloud-rain', iconBgColor: '#e9f5ff', iconColor: '#007bff' };
    case 'emergency':
      return { icon: 'phone', iconBgColor: '#f5e9e9', iconColor: '#ff8c3c' };
    case 'health':
      return { icon: 'heart', iconBgColor: '#f9e9f9', iconColor: '#800080' };
    default:
      return { icon: 'bell', iconBgColor: '#f0f0f0', iconColor: '#333' };
  }
};

const Alert = () => {
  // Data for the summary section
  const summaryData = [
    { number: 2, label: 'High Risk', color: '#dc3545', icon: 'alert-circle' },
    { number: 1, label: 'Medium Risk', color: '#ffc107', icon: 'alert-triangle' },
    { number: 3, label: 'Safe Zones', color: '#28a745', icon: 'shield-check' },
  ];

  // Data for the notification cards
  const notificationsData = [
    {
      type: 'high_risk',
      title: 'High Risk Area Alert',
      description: 'You are approaching Old Town Market - increased pickpocket activity reported',
      time: '5 minutes ago',
      showMarkAsRead: true,
    },
    {
      type: 'safe_zone',
      title: 'Safe Zone Entered',
      description: 'Welcome to Tourist Information Center - 24/7 security available',
      time: '15 minutes ago',
      showMarkAsRead: false,
    },
    {
      type: 'weather',
      title: 'Weather Alert',
      description: 'Heavy rain expected in 30 minutes - seek indoor shelter',
      time: '1 hour ago',
      showMarkAsRead: true,
    },
    {
      type: 'emergency',
      title: 'Emergency Contact Update',
      description: 'Your emergency contact has been successfully updated',
      time: '2 hours ago',
      showMarkAsRead: false,
    },
    {
      type: 'health',
      title: 'Health Advisory',
      description: 'COVID-19 precautions recommended in crowded areas',
      time: '3 hours ago',
      showMarkAsRead: false,
    },
  ];

  // Component for a single summary item
  const SummaryItem = ({ icon, color, number, label }) => (
    <View style={styles.summaryItem}>
      <Icon name={icon} size={24} color={color} />
      <Text style={[styles.summaryNumber, { color }]}>{number}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );

  // Component for a single notification card
  const NotificationCard = ({ type, title, description, time, showMarkAsRead }) => {
    const { icon, iconBgColor, iconColor } = getIconProps(type);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
            <Icon name={icon} size={24} color={iconColor} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardTime}>{time}</Text>
          </View>
        </View>
        <Text style={styles.cardDescription}>{description}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
          {showMarkAsRead && (
            <TouchableOpacity style={[styles.button, styles.markAsReadButton]}>
              <Text style={styles.markAsReadText}>Mark as Read</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={[styles.headerTab, styles.activeHeaderTab]}>
            <Text style={styles.activeHeaderText}>Alert History (5)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerTab}>
            <Text style={styles.inactiveHeaderText}>Notification Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryHeading}>Today's Summary</Text>
          <View style={styles.summaryRow}>
            {summaryData.map((item, index) => (
              <SummaryItem
                key={index}
                icon={item.icon}
                color={item.color}
                number={item.number}
                label={item.label}
              />
            ))}
          </View>
        </View>

        {/* Notification Cards Section */}
        {notificationsData.map((notification, index) => (
          <NotificationCard
            key={index}
            type={notification.type}
            title={notification.title}
            description={notification.description}
            time={notification.time}
            showMarkAsRead={notification.showMarkAsRead}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  activeHeaderTab: {
    backgroundColor: '#ff8c3c',
  },
  activeHeaderText: {
    color: '#fff',
    fontWeight: '600',
  },
  inactiveHeaderText: {
    color: '#a0a0a0',
    fontWeight: '600',
  },

  // Summary Styles
  summarySection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  summaryHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  summaryLabel: {
    color: '#888',
    marginTop: 2,
  },

  // Notification Card Styles
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardTime: {
    fontSize: 12,
    color: '#888',
  },
  cardDescription: {
    color: '#555',
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonText: {
    color: '#555',
    fontWeight: '500',
  },
  markAsReadButton: {
    backgroundColor: '#ff8c3c',
  },
  markAsReadText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default Alert;