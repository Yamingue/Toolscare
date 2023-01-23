import React from "react";
import { View } from "react-native";

const Loader = ({ progress = 0 }) => {

    return <View style={{
        height: 200,
        width: '70%',
        backgroundColor: '#93DE5D',
        borderRadius: 5,
    }}>
        {progress}% loading
    </View>
}

export default Loader