import models.TableRow;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Named
@ApplicationScoped
public class TableBean implements Serializable {
    private List<TableRow> table;


    public TableBean() {
        table = new ArrayList<TableRow>();
    }

    public List<TableRow> getTable() {
        return table;
    }

}
