import * as React from 'react';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Toolbar from "@mui/material/Toolbar";
import {Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import InputWithIcon from "./InputWithIcon";
import ComboBox from "./ComboBox";
import InputAdornment from "@mui/material/InputAdornment";
import axios from 'axios'

// function createData(name, calories, fat, carbs, protein, price) {
//     return {
//         name,
//         calories,
//         fat,
//         carbs,
//         protein,
//         price,
//         history: [
//             {
//                 date: '2020-01-05',
//                 customerId: '11091700',
//                 amount: 3,
//             },
//             {
//                 date: '2020-01-02',
//                 customerId: 'Anonymous',
//                 amount: 1,
//             },
//         ],
//     };
// }

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.salaryFrom}</TableCell>
                <TableCell align="right">{row.salaryTo}</TableCell>
                <TableCell align="right">{row.city.name}</TableCell>
                <TableCell align="right">{row.company.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Szczegóły ogłoszenia
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Publish date</TableCell>
                                        <TableCell>Expire date</TableCell>
                                        <TableCell align="right">Technology</TableCell>
                                        <TableCell align="right">Seniority</TableCell>
                                        <TableCell align="right">Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {row.publishDate}
                                        </TableCell>
                                        <TableCell>{row.expireDate}</TableCell>
                                        <TableCell>{row.seniority.name}</TableCell>
                                        <TableCell align="right">{row.technology.name}</TableCell>
                                        <TableCell align="right">
                                            {row.description}
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//     createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//     createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//     createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function CollapsibleTable() {
    const [filterOpen, setFilterOpen] = React.useState(false);
    const [data, setData] = React.useState([])
    const [postData, setPostData] = React.useState([])
    const get = 'http://localhost:8081/adv/all'
    const post = 'http://localhost:8081/adv/search?page=0&size=2&sort=id,DESC'

    function createData(name, salaryFrom) {
        return {
            name,
            salaryFrom
        }
    }

    const getDataPost = async () => {
        await axios.post(post, createData("Name co", 10)).then((response) => {
            const json = response.data
            console.log(json)
            setPostData(json)
        })
    }

    // const getData = async () => {
    //     await axios.get(get).then((response) => {
    //         const json = response.data
    //         console.log(json)
    //         setData(json)
    //     })
    // }

    // useEffect(() => {
    //     getData()
    // }, [])

    useEffect(() => {
        getDataPost()
    }, [])

    return (
        <>
            <Box>
                <Toolbar>
                    <Grid container>
                        <Grid item sm={2}>
                            <TextField id="outlined-basic"
                                       label="Search advertisement"
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <SearchIcon/>
                                               </InputAdornment>
                                           ),
                                       }}
                                       variant="outlined"/>
                        </Grid>
                        <Grid item sm={9}>
                            <ComboBox/>
                        </Grid>
                        <Grid item sm={1}>
                            <Button color="inherit"
                                    variant="outlined"
                                    onClick={() => setFilterOpen(!filterOpen)}>Filter</Button>
                            <Collapse in={filterOpen} timeout="auto" unmountOnExit>
                                <InputWithIcon/>
                            </Collapse>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Salary Min</TableCell>
                            <TableCell align="right">Salary Max</TableCell>
                            <TableCell align="right">City</TableCell>
                            <TableCell align="right">Company</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {postData.map((row) => (
                            <Row key={row.name} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}