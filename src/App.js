import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import './App.css';

function App() {
  // State to store the list of meals and meal input values
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [calorieCount, setCalorieCount] = useState('');




  const handleAddMeal = () => {

    if (mealName.trim() === '' || isNaN(calorieCount)) {
      alert('Please enter a valid meal name and calorie count.');
      return;
    }


    const newMeal = {
      name: mealName,
      calories: parseFloat(calorieCount),
    };


    setMeals([...meals, newMeal]);

    // Clear the input fields
    setMealName('');
    setCalorieCount('');
  };

  // const calorieSort = [...meals].sort((a, b) => a.calorieCount - b.calorieCount);
  //console.log(calorieSort);
  // const mealSorting = [...meals].sort((a, b) =>
  //   a.mealName > b.mealName ? 1 : -1,
  // );
  //console.log(mealSorting);

  const handleDeleteMeal = (index) => {
    const updatedMeals = [...meals];
    updatedMeals.splice(index, 1);
    setMeals(updatedMeals);
  };

  const getTotalCalories = () => {
    return meals.reduce((total, meal) => total + meal.calories, 0);
  };



  const columns = [
    { field: "id", headerName: "ID", width: 30, align: "left", flex: 4 },
    {
      field: "mealName",
      headerName: "Meal Name",
      width: 100,
      align: "left",
      flex: 4,
      editable: true
    },
    {
      field: "calorieCount",
      headerName: "Calories",
      width: 100,
      align: "left",
      flex: 4,
      editable: true
    }
  ];


  let newId = 0;
  const rows = meals?.map((row) => {
    newId += 1;

    return {
      id: `${newId}`,
      mealName: `${row.name}`,
      calorieCount: row.calories
    };
  });


function MealsData() {
  return (
  <ul className="items-list">
    <li>
      <span className="heading">Id</span>
      <span className="heading">Meal Name</span>
      <span className="heading">Calorie</span>
      <span className="heading">Actions</span>
      </li>
      {
        meals.length ? (
        meals.map((meal, index) => (
        <li key={index}>
          <span className="items">{index+1}</span>
          <span className="items">{meal.name}</span>
          <span>{meal.calories} calories</span>
          <span><span className="delete" onClick={() => handleDeleteMeal(index)}>Delete</span></span>
        </li>
      ))
    ) : (
      <li className="no-data"><span>No data</span></li>
    )
    }
  </ul>
)
}

  return (
    <div className="App">
      <div className="container">
      <h1>Calorie Tracker</h1>
      <div className="wrapper">
      <div className="form-group">
        <TextField label="Meal Name" variant="outlined" fullWidth value={mealName} onChange={(e) => setMealName(e.target.value)} />
        </div>
        <div className="form-group">
        <TextField label="Calories" variant="outlined" fullWidth value={calorieCount} onChange={(e) => setCalorieCount(e.target.value)} />
        </div>
        <Button variant="contained" color="primary" onClick={handleAddMeal}>Login</Button>
        </div>
      <div>
        <h2>Meals:</h2>
        {
          <Box className="datagrid" style={{ height: 300 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            experimentalFeatures={{ newEditingApi: true }}
            sx={{ m: 2, width: "100%" }}
          />
        </Box>
      }

      <MealsData/>

      </div>
      <div>
        <h2>Total Calories: {getTotalCalories()}</h2>
      </div>
      </div>
    </div>
  );
}

export default App;
