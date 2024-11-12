const driftSparkFactory = (rotate, zIndex) => {
    const spark = document.createElement('div');

    //Style
    spark.height = 50; // spark.png height 
    spark.width = 47; // spark.png width 
    spark.style.position = "absolute";
    spark.style.height = spark.height + 'px';
    spark.style.width = spark.width + 'px';

    spark.style.transform = "rotate(45deg)"

    spark.style.zIndex = "2";

    //Sprite
    spark.style.backgroundImage = 'url(carComponent/spark.png)';
    spark.style.backgroundRepeat = 'no-repeat';
    return spark;
}

export default driftSparkFactory;