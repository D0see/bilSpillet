const driftSparkFactory = (yOffset, isRotated, zIndex) => {
    const spark = document.createElement('div');
    spark.id = 'driftSpark'
    //Style
    spark.height = 50; // spark.png height 
    spark.width = 47; // spark.png width 
    spark.style.position = "relative";
    spark.style.height = spark.height + 'px';
    spark.style.width = spark.width + 'px';
    spark.style.bottom = `${yOffset}px`;
    spark.style.transform = `rotate(${(isRotated ? 1 : 0 )*180}deg)`
    spark.style.zIndex = `${zIndex}`;

    //Sprite
    spark.style.opacity = '0';
    spark.style.backgroundImage = 'url(carComponent/spark.png)';
    spark.style.backgroundRepeat = 'no-repeat';
    return spark;
}

export default driftSparkFactory;