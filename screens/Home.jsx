import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'react-native-linear-gradient';

const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tourist Shield</Text>
          <Icon name="shield-checkmark-sharp" size={28} color="#4CAF50" />
        </View>

        {/* Safety Score Card */}
        <View style={styles.card}>
          <View style={styles.scoreHeader}>
            <Text style={styles.cardTitle}>Safety Score</Text>
            <Text style={styles.scoreText}>85</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#4CAF50', '#8BC34A']}
              style={styles.progressBar}
            />
          </View>
          <Text style={styles.safetyStatus}>Your safety level is excellent</Text>
        </View>

        {/* Current Status Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Status</Text>
          <View style={styles.statusItem}>
            <Icon name="location-outline" size={24} color="#007bff" />
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusLabel}>Location</Text>
              <Text style={styles.statusValue}>Downtown Tourist Area</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.statusItem}>
            <Icon name="shield-outline" size={24} color="#4CAF50" />
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusLabel}>Risk Level</Text>
              <Text style={styles.statusValue}>Low</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={[styles.actionButton, styles.emergencyButton]}>
              <Icon name="alarm-outline" size={32} color="#fff" />
              <Text style={styles.actionButtonText}>Emergency SOS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.silentButton]}>
              <Icon name="volume-mute-outline" size={32} color="#fff" />
              <Text style={styles.actionButtonText}>Silent SOS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feature Grid */}
        <View style={styles.featureGrid}>
          <View style={styles.featureRow}>
            <TouchableOpacity style={styles.featureItem}>
              <Icon name="document-text-outline" size={32} color="#007bff" />
              <Text style={styles.featureLabel}>Trip Details</Text>
              <Text style={styles.featureDescription}>Plan your safe journey</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureItem}>
              <Icon name="id-card-outline" size={32} color="#007bff" />
              <Text style={styles.featureLabel}>Digital ID</Text>
              <Text style={styles.featureDescription}>Blockchain-based identity</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featureRow}>
            <TouchableOpacity style={styles.featureItem}>
              <Icon name="map-outline" size={32} color="#007bff" />
              <Text style={styles.featureLabel}>Geo-fencing</Text>
              <Text style={styles.featureDescription}>Area risk alerts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureItem}>
              <Icon name="location-sharp" size={32} color="#007bff" />
              <Text style={styles.featureLabel}>Live Tracking</Text>
              <Text style={styles.featureDescription}>Real-time location</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featureRow}>
            <TouchableOpacity style={styles.featureItem}>
              <Icon name="scan-circle-outline" size={32} color="#007bff" />
              <Text style={styles.featureLabel}>AI Monitoring</Text>
              <Text style={styles.featureDescription}>Smart detection</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureItem}>
              <Icon name="medkit-outline" size={32} color="#007bff" />
              <Text style={styles.featureLabel}>Emergency Support</Text>
              <Text style={styles.featureDescription}>24/7 assistance</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Activity</Text>
          <View style={[styles.activityItem, styles.activitySuccess]}>
            <Icon name="checkmark-circle-sharp" size={24} color="#4CAF50" />
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityLabel}>Safety check completed</Text>
              <Text style={styles.activityTime}>2 minutes ago</Text>
            </View>
          </View>
          <View style={[styles.activityItem, styles.activityInfo]}>
            <Icon name="location-sharp" size={24} color="#007bff" />
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityLabel}>Entered safe zone</Text>
              <Text style={styles.activityTime}>15 minutes ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f4f8',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    width: '85%', // Corresponds to the score of 85
  },
  safetyStatus: {
    fontSize: 14,
    color: '#666',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  statusTextContainer: {
    marginLeft: 15,
  },
  statusLabel: {
    fontSize: 14,
    color: '#888',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 5,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    height: 120,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 10,
  },
  emergencyButton: {
    backgroundColor: '#FF3B30',
  },
  silentButton: {
    backgroundColor: '#FF9500',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  featureGrid: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  featureItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  featureLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 5,
  },
  activitySuccess: {
    borderLeftColor: '#4CAF50',
  },
  activityInfo: {
    borderLeftColor: '#007bff',
  },
  activityTextContainer: {
    marginLeft: 15,
  },
  activityLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  activityTime: {
    fontSize: 12,
    color: '#888',
  },
});

export default TouristDashboard;