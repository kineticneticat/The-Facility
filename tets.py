test_mat = [
    ["00", "10", "20", "30", "40"],
    ["01", "11", "21", "31", "41"],
    ["02", "12", "22", "32", "42"],
    ["03", "13", "23", "33", "43"],
    ["04", "14", "24", "34", "44"],
]
size = [3, 3]
pos = [0, 1]

extract = [["" for _ in range(size[0])] for _ in range(size[1])]

for y in range(len(test_mat)):
    for x in range(len(test_mat[0])):
        if pos[0] <= x <= pos[0]+size[0]-1 and pos[1] <= y <= pos[1]+size[1]-1:
            extract[y-pos[1]][x-pos[0]] = test_mat[y][x]

print(extract)