### CDA - Muliti-Device Interface Project Prep

# Part 3 _ Tablet Interface

### What I completed in Part 3:  

### Part I: Dashboard Architecture & Setup

1. Project Setup & Configuration - Already Completed   (tablet-cluster)
2. Go over Automotive Dashboard CORE Design Principles
    *  Primary Information First: Speed and RPM
    *  International Color Standards: Green = normal operation, Yellow = caution/warning, Red = immediate danger/action required  
    *  Scan Pattern Optimization: Information arranged for quick left-to-right scanning following natural eye movement
    *  Extreme Readability: Must be readable in bright desert sunlight and complete darkness
    *  Redundant Critical Information: Life-critical data appears in multiple formats (analog + digital)
    *  Instant Recognition: Warning states must be recognizable in under 200ms
    *  Failure Indication: System must clearly show when sensors fail or data becomes stale
3. Implementation Standards   (dashboard.ts)
4. Dashboard Connection Hook  (useDashboardConnection.ts)
5. Dashboard App Shell  (App.tsx)

### Part II: Advanced Animated Gauge Components

1. Gauge Mathematics & Trigonometry  (gaugeUtils.ts)
2. Building the Speedometer Component  (Speedometer.tsx)  - Issues: Depreciated: rotation
3. Building the RPM Gauge  (RPMGauge.tsx)  - Issues: Depreciated: rotation


### Part III: Safety-Critical Status & Warning Systems

1. Automotive Status Indicators Component  (StatusIndicator.tsx)
2. Warning System Panel  (WarningPanel.tsx)
3. Trip Computer Component  (TripComputer.tsx)


### Part IV: Responsive Layout & Integration

1. Creating the Main Gauges Component  (MainGauges.tsx)
2. Creating the Dashboard Header  (DashboardHeader.tsx)
3. Creating the Integrated Status Panel  (StatusPanel.tsx)


### Part V: Testing & Performance Optimization

1. Integration Testing





### Proof of Work

- [ ] Customize gauge styling: Try different color schemes, sizes, or visual effects

- [ ] Add new indicators: Create additional warning lights or status displays  

- [ ] Test edge cases: What happens with extreme values or connection loss?
      * Disconnect Server - Conectins status for mobile and table turns to disconnected
      * Watched for stales data in tablet
      * Start Server - opened test client in the browser and tested changes in mobile

- [ ] Performance profiling: Use React Native debugger to monitor your dashboard

- [ ] Document improvements: Note any enhancements or issues you discover

- [ ] Record a small demo of the project running at this point and add a link to a YouTube or other video streaming service to the response section of this lesson.



# Changes:

1. Made the RPM guage a little larger than the speed guage and repositioned it.
2. Add Indicators for Steering and Break in the Vehicle Staus
3. Warning Pannel Changed Background and Title colrfor 



<br>

# Trouble Shooting Issues & Errors:

1. useDashboardConnection.ts - Import shared-types error
   Resolved: Updated to point to '../../../shared-types'


2. App.tsx Import and View Errors
   Resolved - Commented Out Until Component are Built. 

3. Speedometer.tsx: Multiple Errors

   (1.) {Needle} 'rotation' is deprecated.
        types.d.ts(146, 8): The declaration was marked as deprecated here.
        Issue:
        rotation is deprecated
        needleRotation is an Animated.Value
        Resolve: - TEMP HOLD
       

   (2.) {Needle base} Type 'undefined' is not assignable to type 'Element | (string & Element)'.
        Resolve: - Resolved after itself after fixing rotation depreciation

4. - RPMGauge.tsx - Issues: Depreciated: rotation
     Resolve: - See Solution Below

### Rotation - Depreciation Issue


The 'rotation' property in React Native's Animated API has been marked as deprecated. 
This means that while it may still work for now, it is not recommended for use in new code and may be removed in future versions of React Native.


Resources:

MDN https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/transform

React-native-svg: https://github.com/software-mansion/react-native-svg

React-Native: https://reactnative.dev/docs/transforms

**React-Native API : https://reactnative.dev/docs/animations#interpolation** [Most Helpful]

W3Schools: SVG Tutorial: https://www.w3schools.com/graphics/svg_intro.asp


- First tried "Transform" but it did not work - is an object and not seen as a number
- Had to create an Animated component using <G>


_______________________________________________________________

1. Right After Improts Add: 

      const AnimatedG = Animated.createAnimatedComponent(G);

      // Created an Animated version of the SVG <G> (group) element.
      // This is needed because Animated.Value cannot be passed directly 
      // to a regular SVG component's transform prop — only components 
      // wrapped with createAnimatedComponent can accept animated values.


2. Replce 
      <G
         rotation={needleRotation} 
         originX={CENTER_X} originY={CENTER_Y}
      
      >


 With: 

       <AnimatedG
         transform={needleRotation.interpolate({
         inputRange: [-120, 120],
         outputRange: [
            `rotate(-120, ${CENTER_X}, ${CENTER_Y})`,
            `rotate(120, ${CENTER_X}, ${CENTER_Y})`
            ]
         })}
      >  


      // Replaced deprecated 'rotation' prop with 'transform'.
      // .interpolate() maps the Animated.Value (a number from -120 to 120)
      // into SVG transform strings like "rotate(-120, 100, 100)".
      // React Native's animation system extracts the numbers from matching
      // string patterns and animates smoothly between them.

      

3. Replce Closing Tag </G>  With  </AnimatedG>