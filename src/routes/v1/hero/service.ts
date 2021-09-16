import { Response } from "express";

export async function exportPdf(data: [any], res: Response) {
    const pdf = require("pdf-creator-node");
    const fs = require("fs");
    const html = fs.readFileSync("build/templates/pdf/hero.html", "utf8");

    const options = {
        format: "A3",
        orientation: "landscape",
        border: "10mm",
    };

    const _document = {
        html: html,
        data: {
            heroes: data,
        },
        path: "build/exports/output.pdf"
    };

    return pdf.create(_document, options)
        .then((file: any) => res.download(file.filename))
        .catch((err: any) => res.send(err));

}

export async function exportExcel(data: [any], res: Response) {
    const xl = require('excel4node');
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Hero List');

    const headingColumnNames = [
        "Name",
        "Alias",
        "Species",
        "Company_name",
        "Company_team"
    ]

    let headingColumnIndex = 1;
    headingColumnNames.forEach(heading => {
        ws.cell(1, headingColumnIndex++)
            .string(heading)
    });

    let rowIndex = 2;
    let columns = ["name", "alias", "species"];
    data.forEach((record: any) => {
        Object.keys(record).filter((key) => key != "id").forEach((columnName: any) => {
            if (columnName == "company") {
                ws.cell(rowIndex, 4)
                    .string(record[columnName].name);
                ws.cell(rowIndex, 5)
                    .string(record[columnName].team);
            } else {
                ws.cell(rowIndex, columns.indexOf(columnName) + 1)
                    .string(record[columnName]);
            }
        });
        rowIndex++;
    });

    const file = "build/exports/output.xlsx";
    return wb.write(file, function (err: any) {
        if (err) res.send(err);
        res.download(file);
    });

}