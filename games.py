import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

def game_of_life(grid):
    # Create a copy of the grid to update
    new_grid = np.copy(grid)

    # Iterate over the grid
    for i in range(grid.shape[0]):
        for j in range(grid.shape[1]):
            # Count the number of live neighbors
            live_neighbors = (grid[i-1:i+2, j-1:j+2] == 1).sum() - grid[i,j]

            # Update the cell according to the rules
            if grid[i,j] == 1:
                if live_neighbors < 2 or live_neighbors > 3:
                    new_grid[i,j] = 0
            else:
                if live_neighbors == 3:
                    new_grid[i,j] = 1

    return new_grid

# Create an initial grid
grid = np.random.choice([0,1], (20,20))

# Set up the plot
fig, ax = plt.subplots()
im = ax.imshow(grid, cmap='gray')

# Define the animation function
def update(frame):
    global grid
    grid = game_of_life(grid)
    im.set_data(grid)

# Create the animation
ani = FuncAnimation(fig, update, frames=np.arange(0, 20), repeat=True)
plt.show()
