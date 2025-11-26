#include <stdio.h>

int main() {
    // Part 1: One-dimensional array
    int arr[5];
    printf("Enter 5 integers for the array:\n");
    for (int i = 0; i < 5; i++) {
        printf("Enter element %d: ", i + 1);
        scanf("%d", &arr[i]);
    }

    printf("The elements in the one-dimensional array are:\n");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n\n");

    // Part 2: Two-dimensional array (3x3 matrix)
    int matrix[3][3];
    int sum = 0;

    printf("Enter 9 integers for the 3x3 matrix:\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("Enter element [%d][%d]: ", i, j);
            scanf("%d", &matrix[i][j]);
            sum += matrix[i][j];
        }
    }

    printf("The 3x3 matrix is:\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\n");
    }

    printf("\nThe sum of all elements in the matrix is: %d\n", sum);

}
