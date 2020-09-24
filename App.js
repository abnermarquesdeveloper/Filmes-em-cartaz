import React, {useState,useEffect} from 'react';
import {SafeAreaView
        ,Text,
        FlatList,
        Image,
        View,
        StyleSheet,
        ActivityIndicator
} from 'react-native';

const App = () =>{

  const [loading,setLoading] = useState(false);
  const [movies,setMovies] = useState([]);

  useEffect(()=>{
    const requestMovies = async () =>{
      setLoading(true);
      const req = await fetch("https://api.b7web.com.br/cinema/");
      const json = await req.json();

      if(json){
        setMovies(json);
      }
      setLoading(false);
    }
    requestMovies();
  },[]);

  const handleLoadButton = async () =>{
    
  }

  return(
    <SafeAreaView style={styles.container}>
      {loading &&
        <View style={styles.loadingArea}>
          <ActivityIndicator size="large" color="#FFF"/>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      }
      {!loading &&
        <>
          <Text style={styles.totalMoviesText}>Total de filmes: {movies.length}</Text>
          <FlatList
            style={styles.list}
            data={movies}
            renderItem={({item})=>(
              <View style={styles.moveItem}>
                <Image
                  source={{uri: item.avatar}}
                  style={styles.moveImage}
                  resizeMode="contain"
                  />
                <Text style={styles.moveTitle}>{item.titulo}</Text>
              </View>
            )}
            keyExtractor={item => item.titulo}
          />
        </>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#333'
  },
  totalMoviesText:{
    color:'#FFF',
    fontSize:18,
    textAlign:"center",
    marginTop:10,
    marginBottom:10
  },
  list:{
    flex:1
  },
  moveItem:{
    marginBottom:40
  },
  moveImage:{
    height:400
  },
  moveTitle:{
    color:'#FFF',
    fontSize:24,
    textAlign:"center",
    marginTop:5
  },
  loadingArea:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  loadingText:{
    color:'#FFF',
    fontSize:18
  }
});

export default App;
