import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableOpacity,
    Animated,
    Dimensions,
    StatusBar,
    Platform,
    SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const initialFormState = {
    fullName: '',
    email: '',
    phone: '',
    destination: '',
    arrivalDate: new Date(),
    departureDate: new Date(),
    purpose: '',
    groupSize: '1',
    accommodationType: '',
    accommodationName: '',
    accommodationAddress: '',
    primaryTransportation: '',
    activities: [],
    visitedBefore: false,
    emergencyContact1Name: '',
    emergencyContact1Phone: '',
    emergencyContact1Relationship: '',
    emergencyContact2Name: '',
    emergencyContact2Phone: '',
    emergencyContact2Relationship: '',
    medicalConditions: '',
    specialNeeds: '',
    hasTravelInsurance: false,
    awareOfSafetyRisks: false,
    additionalNotes: '',
};

// Animated Input Component
const AnimatedInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType,
    required,
    multiline,
    numberOfLines,
    style,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
    const borderAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isFocused || value ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();

        Animated.timing(borderAnimation, {
            toValue: isFocused ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    const labelStyle = {
        position: 'absolute',
        left: 16,
        top: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [multiline ? 20 : 18, -8],
        }),
        fontSize: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        color: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['#999', '#6C63FF'],
        }),
        backgroundColor: '#fff',
        paddingHorizontal: 4,
        zIndex: 1,
    };

    const borderColor = borderAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#E8E8E8', '#6C63FF'],
    });

    return (
        <View style={[styles.animatedInputContainer, style]}>
            <Animated.Text style={labelStyle}>
                {label} {required && <Text style={styles.required}>*</Text>}
            </Animated.Text>
            <Animated.View style={[styles.inputWrapper, { borderColor }]}>
                <TextInput
                    style={[styles.animatedInput, multiline && styles.textAreaInput]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder=""
                    keyboardType={keyboardType}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                />
            </Animated.View>
        </View>
    );
};

// Section Component with Animation
const AnimatedSection = ({ title, children, delay = 0 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.section,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <View style={styles.sectionDivider} />
            </View>
            {children}
        </Animated.View>
    );
};

// Custom Radio Button
const CustomRadio = ({ selected, onPress, label }) => {
    const scaleAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: selected ? 1 : 0,
            useNativeDriver: true,
        }).start();
    }, [selected]);

    return (
        <TouchableOpacity style={styles.radioOption} onPress={onPress}>
            <View style={styles.radioCircle}>
                <Animated.View
                    style={[
                        styles.radioDot,
                        {
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                />
            </View>
            <Text style={styles.radioText}>{label}</Text>
        </TouchableOpacity>
    );
};

export default function SafeTripForm({ onLogin }) {
    const [formData, setFormData] = useState(initialFormState);
    const [showArrivalPicker, setShowArrivalPicker] = useState(false);
    const [showDeparturePicker, setShowDeparturePicker] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 6;

    const scrollViewRef = useRef(null);
    const progressAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: currentStep,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [currentStep]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleToggleActivity = (activity) => {
        setFormData((prevState) => {
            const newActivities = prevState.activities.includes(activity)
                ? prevState.activities.filter((a) => a !== activity)
                : [...prevState.activities, activity];
            return { ...prevState, activities: newActivities };
        });
    };

    const handleDateChange = (event, selectedDate, type) => {
        if (type === 'arrival') {
            setShowArrivalPicker(false);
            if (selectedDate) {
                setFormData({ ...formData, arrivalDate: selectedDate });
            }
        } else {
            setShowDeparturePicker(false);
            if (selectedDate) {
                setFormData({ ...formData, departureDate: selectedDate });
            }
        }
    };

    const handleSubmit = () => {
        console.log('Form Submitted:', formData);
    };

    const activityOptions = [
        'Sightseeing',
        'Adventure Sports',
        'Beach Activities',
        'Cultural Tours',
        'Nightlife',
        'Shopping',
        'Photography',
        'Food Tours',
        'Hiking',
        'Water Sports',
    ];

    const renderProgressBar = () => (
        <View style={styles.progressContainer}>
            <Animated.View
                style={[
                    styles.progressBar,
                    {
                        width: progressAnim.interpolate({
                            inputRange: [1, totalSteps],
                            outputRange: ['16.66%', '100%'],
                        }),
                    },
                ]}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#6C63FF" />

            <LinearGradient
                colors={['#6C63FF', '#4FACFE']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <View style={styles.headerIcon}>
                        <Icon name="airplane" size={32} color="#fff" />
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>Plan Your Safe Trip</Text>
                        <Text style={styles.headerSubtitle}>
                            Personalized safety guidance for your journey
                        </Text>
                    </View>
                </View>
                {renderProgressBar()}
            </LinearGradient>

            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {/* Personal Information */}
                <AnimatedSection title="Personal Information" delay={100}>
                    <AnimatedInput
                        label="Full Name"
                        value={formData.fullName}
                        onChangeText={(text) => handleInputChange('fullName', text)}
                        required
                    />
                    <AnimatedInput
                        label="Email Address"
                        value={formData.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                        keyboardType="email-address"
                        required
                    />
                    <AnimatedInput
                        label="Phone Number"
                        value={formData.phone}
                        onChangeText={(text) => handleInputChange('phone', text)}
                        keyboardType="phone-pad"
                        required
                    />
                </AnimatedSection>

                {/* Trip Information */}
                <AnimatedSection title="Trip Information" delay={200}>
                    <AnimatedInput
                        label="Destination"
                        value={formData.destination}
                        onChangeText={(text) => handleInputChange('destination', text)}
                        required
                    />

                    {/* Rest of your JSX remains the same */}
                </AnimatedSection>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FF', },
    header: { paddingTop: Platform.OS === 'ios' ? 0 : 20, paddingBottom: 20, paddingHorizontal: 20, },
    headerContent: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, },
    headerIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255, 255, 255, 0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 15, },
    headerTextContainer: { flex: 1, }, headerTitle: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 4, },
    headerSubtitle: { fontSize: 14, color: 'rgba(255, 255, 255, 0.8)', fontWeight: '400', },
    progressContainer: { height: 4, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 2, overflow: 'hidden', },
    progressBar: { height: '100%', backgroundColor: '#fff', borderRadius: 2, },
    scrollView: { flex: 1, },
    scrollViewContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 30, },
    section: {
        backgroundColor: '#fff', borderRadius: 20, padding: 24, marginBottom: 20, shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.1, shadowRadius: 16, elevation: 8,
    },
    sectionHeader: { marginBottom: 24, },
    sectionTitle: { fontSize: 20, fontWeight: '700', color: '#2D3748', marginBottom: 8, },
    sectionDivider: { height: 3, width: 40, backgroundColor: '#6C63FF', borderRadius: 2, },
    subSectionTitle: { fontSize: 16, fontWeight: '600', color: '#4A5568', marginTop: 20, marginBottom: 16, },
    animatedInputContainer: { marginBottom: 20, },
    inputWrapper: { borderWidth: 1.5, borderRadius: 12, backgroundColor: '#fff', },
    animatedInput: { height: 50, paddingHorizontal: 16, fontSize: 16, color: '#2D3748', },
    textAreaInput: { height: 100, paddingTop: 16, textAlignVertical: 'top', },
    required: { color: '#E53E3E', },
    datePickerContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, }, dateInput: { flex: 1, marginHorizontal: 5, backgroundColor: '#F7FAFC', borderRadius: 12, padding: 16, borderWidth: 1.5, borderColor: '#E2E8F0', }, dateLabel: { fontSize: 12, color: '#6C63FF', fontWeight: '600', marginBottom: 4, }, dateValue: { fontSize: 16, color: '#2D3748', fontWeight: '500', marginBottom: 8, }, pickerContainer: { marginBottom: 20, }, pickerLabel: { fontSize: 14, color: '#4A5568', fontWeight: '600', marginBottom: 8, }, picker: { backgroundColor: '#F7FAFC', borderRadius: 12, height: 50, }, activityTitle: { fontSize: 14, color: '#4A5568', fontWeight: '600', marginBottom: 16, }, activityButtonContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, }, activityButton: { backgroundColor: '#F7FAFC', borderRadius: 25, paddingVertical: 12, paddingHorizontal: 20, margin: 4, borderWidth: 1.5, borderColor: '#E2E8F0', }, activityButtonSelected: { backgroundColor: '#6C63FF', borderColor: '#6C63FF', }, activityButtonText: { color: '#4A5568', fontSize: 14, fontWeight: '500', }, activityButtonTextSelected: { color: '#fff', fontWeight: '600', }, radioTitle: { fontSize: 14, color: '#4A5568', fontWeight: '600', marginBottom: 16, }, radioContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, }, radioOption: { flexDirection: 'row', alignItems: 'center', marginRight: 30, }, radioCircle: { height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: '#6C63FF', alignItems: 'center', justifyContent: 'center', marginRight: 12, }, radioDot: { height: 12, width: 12, borderRadius: 6, backgroundColor: '#6C63FF', }, radioText: { fontSize: 16, color: '#4A5568', fontWeight: '500', }, characterCount: { fontSize: 12, color: '#A0AEC0', textAlign: 'right', marginTop: 8, }, submitButtonContainer: { marginTop: 20, marginBottom: 30, }, submitButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, borderRadius: 16, },
    submitButtonText: { color: '#fff', fontSize: 18, fontWeight: '700', marginRight: 8, }, submitIcon: { marginLeft: 4, },
});